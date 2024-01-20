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
