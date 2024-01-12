export type NameTemplate = 'Minimal' | 'Collaborate' | 'Inspire' | 'Empower' | 'Unleash'

export type SectionKey =
  | 'banner'
  | 'stack'
  | 'project-summary'
  | 'setting-up'
  | 'run-locally'
  | 'contributors'
  | 'license'
  | 'project-structure'
  | 'deploy'
  | 'roadmap'
  | 'acknowledgements'
  | 'changelog'
  | 'prerequisites'
  | 'faq'
  | 'ext-commands'
  | 'table-contents'
  | 'overview'
  | 'badges'

export enum NodeName {
  BANNER = 'custom-banner',
  TECH_STACK = 'custom-techStack',
  PROJECT_SUMMARY = 'custom-projectSummary',
  SETTING_UP = 'custom-envVariablesGuide',
  RUN_LOCALLY = 'custom-runlocally',
  CONTRIBUTORS = 'custom-contributors',
  LICENSE = 'custom-license',
  PROJECT_STRUCTURE = 'custom-projectStructure',
  DEPLOY = 'custom-deploy',
  ROADMAP = 'custom-roadmap',
  ACKNOWLEDGEMENTS = 'custom-acknowledgments',
  CHANGELOG = 'custom-changelog',
  PREREQUISITES = 'custom-prerequisites',
  FAQ = 'custom-faq',
  COMMANDS = 'custom-commands',
  TABLE_CONTENTS = 'custom-tableContents',
  OVERVIEW = 'custom-overview',
  BADGE = 'custom-badges'
}

export type Section = {
  id: SectionKey
  name: string
  emoji: string | undefined
  description: string
}

export type SectionState = Section & { added: boolean }

export type Template = {
  srcImage: string
  altImage: string
  nameTemplate: NameTemplate
  authorTemplate?: string
  urlAuthor?: string
  description?: string
  sections?: SectionKey[]
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

export type GitRepository = {
  repoName: string
  owner: string
  description: string
  language: string
  branch: string
  urlRepository: string
}
