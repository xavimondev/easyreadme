import { Tree, TreeFormatted, TypeFile } from '@/types/git'

import { LANGUAGES_FILES_PARSERS, LANGUAGES_SETUP } from '@/constants'
import {
  getFileContents,
  getNestedPathsByDirectory,
  getRepositoryStructure
} from '@/services/github'

import { getWorkspacePackageJson, getWorkspacePnpmLock } from './parse'

export const getRepoNameAndOwnerFromUrl = ({ urlRepository }: { urlRepository: string }) => {
  const urlParts = urlRepository.split('/')
  const owner = urlParts.at(3)
  const repoName = urlParts.at(4)

  return {
    owner,
    repoName
  }
}

const buildTreeStructure = (path: string, type: string, parent: any) => {
  const pathParts = path.split('/') // [components]
  const segmentString = pathParts[0] // components

  // {file: 'components', type: 'tree'}
  let node = parent.find((item: any) => item.file === segmentString)

  if (!node) {
    node = { file: segmentString, type } // {file: 'components', type: 'tree'}
    parent.push(node) // [{file: 'components', type: 'tree'}]
  }
  // If there's one segment or file. Ex: ['README.md']
  if (pathParts.length === 1) return

  // Otherwise, add children property to store its directory
  if (!node.children) {
    node.children = [] //{file: app, type: 'tree', children: []}
  }
  //src,type(tree, blob),[]
  buildTreeStructure(pathParts.slice(1).join('/'), type, node.children)
}

const transformTreeToString = (node: any, indent = '') => {
  let result = ''

  if (node && node.length > 0) {
    const keys = Object.keys(node)
    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1
      const item = node[key]
      const { file, type, children } = item
      result += `${indent}${isLast ? '└──' : '├──'} ${file}\n`

      if (type === 'tree') {
        result += transformTreeToString(children, `${indent}${isLast ? '    ' : '│   '}`)
      }
    })
  }

  return result
}

const generateDirectoryTree = ({ tree }: { tree: Tree[] }) => {
  const treeFormatted: TreeFormatted[] = []

  tree.forEach((item: Tree) => {
    buildTreeStructure(item.path, item.type, treeFormatted)
  })

  return transformTreeToString(treeFormatted)
}

export const getRepositoryTreeDirectory = async ({
  owner,
  repoName,
  branch
}: {
  owner: string
  repoName: string
  branch: string
}) => {
  const { data: tree, error } = await getRepositoryStructure({
    owner,
    repoName,
    branch
  })
  if (error) return { error }

  const treeString = generateDirectoryTree({ tree: tree! })
  return { data: treeString }
}

export const isValidGitHubRepositoryURL = ({ url }: { url: string }) => {
  const githubRepoRegex = /^https:\/\/github\.com\/[^/]+\/[^/]+(\/)?$/
  return githubRepoRegex.test(url)
}

export const getDependencies = async ({
  language,
  repoName,
  owner,
  defaultBranch
}: {
  language: string
  repoName: string
  owner: string
  defaultBranch: string
}): Promise<{ data?: string | undefined; error?: string | undefined }> => {
  try {
    const languageSetup = LANGUAGES_SETUP.find((item) => item.languages.includes(language))
    if (!languageSetup || languageSetup.fileDependencies.length === 0) return { data: undefined }

    // return the tree
    const { data: tree, error } = await getRepositoryStructure({
      repoName: repoName,
      owner: owner,
      branch: defaultBranch
    })

    if (error) return { error }

    if (!tree) return { data: undefined }

    const fileDependencies = languageSetup.fileDependencies
    // Get only the first path found
    const fileFound = tree
      .filter((file) => file.type === TypeFile.Blob)
      .find((item) => fileDependencies.find((file) => item.path.includes(file)))
    if (!fileFound) return { data: undefined }

    const filePath = fileFound.path
    // once I have the path, fetch dependency file's contents
    const { data: fileDependenciesContent, error: errorContents } = await getFileContents({
      path: filePath,
      owner: owner,
      repoName: repoName
    })
    if (errorContents) return { error: errorContents }
    if (!fileDependenciesContent) return { data: undefined }

    const segments = filePath.split('/')
    const lastSegment = segments.at(-1) as string
    const parser = LANGUAGES_FILES_PARSERS[lastSegment.toLowerCase()]
    if (!parser) {
      return { data: undefined }
    }

    const dependencies = parser({ content: fileDependenciesContent })

    if (!dependencies) {
      return { data: undefined }
    }
    return { data: dependencies }
  } catch (error) {
    return { error: 'An error has ocurred' }
  }
}

export const getPrerequisites = async ({
  language,
  repoName,
  owner,
  defaultBranch
}: {
  language: string
  repoName: string
  owner: string
  defaultBranch: string
}) => {
  const languageSetup = LANGUAGES_SETUP.find((item) => item.languages.includes(language))

  if (!languageSetup) return { data: undefined }

  // it means, it's a JavaScript project
  if (languageSetup.lockFiles) {
    const { data: tree, error } = await getRepositoryStructure({
      repoName,
      owner,
      branch: defaultBranch
    })

    if (error) return { error }
    if (!tree) return { data: undefined }

    // Get only paths such as ['src/components/hello.tsx','package.json','pnpm-lock.yaml'...]
    const paths = tree.filter((file) => file.type === TypeFile.Blob).map((file) => file.path)
    // Checking the existence of package.json
    const fileDependencies = languageSetup.fileDependencies.at(0) as string
    const hasPackageJson = paths.some((path) => path.includes(fileDependencies))

    if (!hasPackageJson) return { data: undefined }

    const searchRuntime = ({ lockFile }: { lockFile: string }) => {
      const param = lockFile === 'deno.lock' ? 'Deno' : 'Node'
      return languageSetup.runtimes?.find((runtime) => runtime.id === param)
    }

    const lockFiles = languageSetup.lockFiles
    const mappedLocks = lockFiles.map((filelock) => filelock.lockfile)

    const lockFile = mappedLocks.find((lockFileName) =>
      paths.some((path) => path.includes(lockFileName))
    )

    // If none of the lock files match any of the files in the directory, it'll return node by default
    const rules = lockFiles.find((file) => {
      const condition = !lockFile ? file.id === 'npm' : file.lockfile === lockFile
      return condition
    })

    const runtime = searchRuntime({ lockFile: 'deno.lock' })

    const res = {
      rules,
      runtime,
      typescriptResource: language === 'TypeScript' ? languageSetup.typescriptResource : undefined
    }

    return { data: res }
  }

  // other programming languages
  return {
    data: {
      rules: languageSetup.installation
    }
  }
}

export const getMonorepoData = async ({
  language,
  repoName,
  owner,
  defaultBranch
}: {
  language: string
  repoName: string
  owner: string
  defaultBranch: string
}) => {
  const languageSetup = LANGUAGES_SETUP.find((item) => item.languages.includes(language))

  if (!languageSetup) return { data: undefined }

  const { data: tree, error } = await getRepositoryStructure({
    repoName,
    owner,
    branch: defaultBranch
  })

  if (error) return { error }
  if (!tree) return { data: undefined }

  const paths = tree.filter((file) => file.type === TypeFile.Blob).map((file) => file.path)

  const lockFiles = languageSetup.lockFiles!

  const lockFile = lockFiles.find((lockFile) =>
    paths.some((path) => path.includes(lockFile.lockfile))
  )

  const workspaceFile = lockFile?.id === 'pnpm' ? 'pnpm-workspace.yaml' : 'package.json'
  const pathUrl = paths.find((path) => path === workspaceFile)

  if (!pathUrl) return { data: undefined }

  // once I have the path, fetch dependency file's contents
  const { data: fileDependenciesContent, error: errorContents } = await getFileContents({
    path: pathUrl,
    owner: owner,
    repoName: repoName
  })

  if (errorContents) return { error: errorContents }
  if (!fileDependenciesContent) return { data: undefined }

  const workspaces =
    lockFile?.id === 'pnpm'
      ? getWorkspacePnpmLock({ content: fileDependenciesContent })
      : getWorkspacePackageJson({ content: fileDependenciesContent })

  if (!workspaces || workspaces.length === 0) return { data: undefined }

  const workspacesContent = await Promise.all(
    workspaces.map(async (workspace) => {
      const paths = await getNestedPathsByDirectory({
        path: workspace,
        owner: owner,
        repoName: repoName
      })

      return {
        name: workspace,
        nested: paths
      }
    })
  )

  return { data: workspacesContent }
}
