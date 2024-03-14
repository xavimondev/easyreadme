import { NodeName } from './builder'

export type NameTemplate =
  | 'Minimal'
  | 'Collaborate'
  | 'Inspire'
  | 'NPM Package'
  | 'VS Code Extension'
  | 'API'
  | 'Monorepos'

export type Template = {
  nameTemplate: NameTemplate
  description?: string
  sections?: NodeName[]
  tags: string[]
}
