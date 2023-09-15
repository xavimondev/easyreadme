export type Template = {
  srcImage: string
  altImage: string
  nameTemplate: string
  authorTemplate: string
  urlAuthor: string
}

export type GitTreeResponse = {
  sha: string
  url: string
  tree: Tree[]
  truncated: boolean
}

export type Tree = {
  path: string
  mode?: string
  type: Type
  sha?: string
  size?: number
  url?: string
}

enum Type {
  Blob = 'blob',
  Tree = 'tree'
}

export type TreeFormatted = {
  file: string
  type: string
  children?: TreeFormatted[]
}
