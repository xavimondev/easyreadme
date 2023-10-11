import { README_SECTIONS } from '@/constants'

export type NameTemplate = 'Minimal' | 'Collaborate' | 'Inspire' | 'Empower' | 'Unleash'

export type Template = {
  srcImage: string
  altImage: string
  nameTemplate: NameTemplate
  authorTemplate?: string
  urlAuthor?: string
  description?: string
  sections?: Section[]
  srcVideo?: string
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
  type: TypeFile
  sha?: string
  size?: number
  url?: string
}

export enum TypeFile {
  Blob = 'blob',
  Tree = 'tree'
}

export type TreeFormatted = {
  file: string
  type: string
  children?: TreeFormatted[]
}

export type BadgeName =
  | 'forks'
  | 'codesize'
  | 'stars'
  | 'watchers'
  | 'contributors'
  | 'last_commit'
  | 'license'
  | 'top_language'
  | 'commit_activity_month'
  | 'discussions'
  | 'issues'
  | 'pull_requests'
  | 'deployment'

export type Section = keyof typeof README_SECTIONS

export type GitRepository = {
  repoName: string
  owner: string
  description: string
  language: string
  branch: string
  urlRepository: string
}
