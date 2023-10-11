import {
  CODESIZE_URL,
  COMMIT_ACTIVITY_MONTH_URL,
  CONTRIBUTORS_URL,
  DEPLOYMENTS_URL,
  DISCUSSIONS_URL,
  FORKS_URL,
  ISSUES_URL,
  LAST_COMMIT_URL,
  LICENSE_URL,
  PULL_REQUESTS_URL,
  STARS_URL,
  TOP_LANGUAGE_URL,
  WATCHERS_URL,
  LANGUAGES_FILES_PARSERS,
  LANGUAGES_SETUP
} from '@/constants'
import { getRepositoryStructure, getFileContents } from '@/services/github'
import { BadgeName, Tree, TreeFormatted, TypeFile } from '@/types'

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
  const tree = await getRepositoryStructure({
    owner,
    repoName,
    branch
  })
  if (!tree) return ''
  const treeString = generateDirectoryTree({ tree })
  return treeString
}

export const isValidGitHubRepositoryURL = ({ url }: { url: string }) => {
  const githubRepoRegex = /^https:\/\/github\.com\/[^/]+\/[^/]+(\/)?$/
  return githubRepoRegex.test(url)
}

export const getBadgeByName = ({
  repoName,
  owner,
  badge
}: {
  repoName: string
  owner: string
  badge: BadgeName
}) => {
  const badgeOptions: Record<BadgeName, { label: string; url: string }> = {
    forks: {
      label: 'GitHub forks',
      url: `${FORKS_URL}/${owner}/${repoName}`
    },
    codesize: {
      label: 'GitHub code size in bytes',
      url: `${CODESIZE_URL}/${owner}/${repoName}`
    },
    stars: {
      label: 'GitHub stars',
      url: `${STARS_URL}/${owner}/${repoName}`
    },
    watchers: {
      label: 'GitHub watchers',
      url: `${WATCHERS_URL}/${owner}/${repoName}`
    },
    contributors: {
      label: 'GitHub contributors',
      url: `${CONTRIBUTORS_URL}/${owner}/${repoName}`
    },
    last_commit: {
      label: 'GitHub last commit',
      url: `${LAST_COMMIT_URL}/${owner}/${repoName}`
    },
    license: {
      label: 'GitHub license',
      url: `${LICENSE_URL}/${owner}/${repoName}`
    },
    top_language: {
      label: 'GitHub top language',
      url: `${TOP_LANGUAGE_URL}/${owner}/${repoName}`
    },
    commit_activity_month: {
      label: 'GitHub commit activity month',
      url: `${COMMIT_ACTIVITY_MONTH_URL}/${owner}/${repoName}`
    },
    discussions: {
      label: 'GitHub discussions',
      url: `${DISCUSSIONS_URL}/${owner}/${repoName}`
    },
    issues: {
      label: 'GitHub issues',
      url: `${ISSUES_URL}/${owner}/${repoName}`
    },
    pull_requests: {
      label: 'GitHub pull request',
      url: `${PULL_REQUESTS_URL}/${owner}/${repoName}`
    },
    deployment: {
      label: 'GitHub deployment',
      url: `${DEPLOYMENTS_URL}/${owner}/${repoName}/production`
    }
  }

  return badgeOptions[badge]
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
}): Promise<string | null> => {
  try {
    const languageSetup = LANGUAGES_SETUP.find((item) => item.language === language)
    if (!languageSetup || languageSetup.fileDependencies.length === 0) {
      return null
    }

    // return the tree
    const tree = await getRepositoryStructure({
      repoName: repoName,
      owner: owner,
      branch: defaultBranch
    })
    if (!tree) return null

    const fileDependencies = languageSetup.fileDependencies
    // Get only the first path found
    const fileFound = tree
      .filter((file) => file.type === TypeFile.Blob)
      .find((item) => fileDependencies.find((file) => item.path.includes(file)))
    if (!fileFound) return null

    const filePath = fileFound.path
    // once I have the path, fetch dependency file's contents
    const fileDependenciesContent = await getFileContents({
      path: filePath,
      owner: owner,
      repoName: repoName
    })
    if (!fileDependenciesContent) return null

    const segments = filePath.split('/')
    const lastSegment = segments.at(-1) as string
    const parser = LANGUAGES_FILES_PARSERS[lastSegment.toLowerCase()]
    if (!parser) {
      return null
    }

    const dependencies = parser({ content: fileDependenciesContent })

    if (!dependencies) {
      return null
    }
    return dependencies
  } catch (error) {
    return null
  }
}
