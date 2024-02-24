import { type Editor } from '@tiptap/core'

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
  BADGE = 'custom-badges',
  API_REFERENCE = 'custom-api-reference',
  FEEDBACK = 'custom-feedback',
  LIB_PROPS = 'custom-lib-props'
}

export type Section = {
  id: NodeName
  name: string
  emoji: string | undefined
  description: string
  add: ({ editor, endPos, data }: { editor: Editor; endPos: number; data?: any }) => void
}

export enum ContributorOption {
  GALLERY = 'gallery',
  TABLE = 'table'
}

export type BadgeItem = {
  id: string
  name: string
  url: string
}

export type BadgeOption = {
  id: string
  label: string
  data: BadgeItem[]
}
