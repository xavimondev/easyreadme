import {
  MONOREPO_SUMMARY_SCHEMA,
  PROJECT_SUMMARY_SCHEMA,
  SETTING_UP_ENV_VARS_SCHEMA,
  TECH_STACK_SCHEMA
} from '@/utils/ai-schemas'

export type AIProvider = 'OpenAI' | 'Mistral'
export type SchemaTypes =
  | typeof PROJECT_SUMMARY_SCHEMA
  | typeof TECH_STACK_SCHEMA
  | typeof SETTING_UP_ENV_VARS_SCHEMA
  | typeof MONOREPO_SUMMARY_SCHEMA

export type Section = 'project-summary' | 'tech-stack' | 'setting-up' | 'monorepo-summary'
