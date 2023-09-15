import { GitTreeResponse, Tree, TreeFormatted } from '@/types'

export const getRepositoryDetails = ({ urlRepository }: { urlRepository: string }) => {
  const urlParts = urlRepository.split('/')
  const owner = urlParts.at(3)
  const repoName = urlParts.at(4)

  return {
    owner,
    repoName
  }
}

export const getRepositoryStructure = async ({
  urlRepository
}: {
  urlRepository: string
}): Promise<Tree[] | null> => {
  const { owner, repoName } = getRepositoryDetails({
    urlRepository
  })
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/trees/main?recursive=1`
    )
    const data = (await response.json()) as GitTreeResponse
    const directory = data.tree.map((item: Tree) => ({
      path: item.path,
      type: item.type
    }))
    return directory
  } catch (error) {
    console.error(error)
    return null
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

export const getRepositoryTreeDirectory = async ({ urlRepository }: { urlRepository: string }) => {
  const tree = await getRepositoryStructure({ urlRepository })
  if (!tree) return ''
  const treeString = generateDirectoryTree({ tree })
  return treeString
}

export const getMainLanguage = async ({ urlRepository }: { urlRepository: string }) => {
  const { owner, repoName } = getRepositoryDetails({
    urlRepository
  })
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`)
    const data = await response.json()
    return data.lenguage
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getFileContents = async ({
  path,
  owner,
  repository
}: {
  path: string
  owner: string
  repository: string
}) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repository}/contents/${path}`
    )
    const data = await response.json()
    const content = atob(data.content)
    return content
  } catch (error) {
    console.error(error)
    return null
  }
}
