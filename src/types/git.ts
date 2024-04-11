export type GitTreeResponse = {
  sha: string
  url: string
  tree: Tree[]
  truncated: boolean
}

export type Tree = {
  path: string
  mode?: string
  type: TypeFile
  sha?: string
  size?: number
  url?: string
}

export enum TypeFile {
  Blob = 'blob',
  Tree = 'tree'
}

export type GitRepository = {
  repoName: string
  owner: string
  description: string
  language: string
  branch: string
  urlRepository: string
}

export type TreeFormatted = {
  file: string
  type: string
  children?: TreeFormatted[]
}
