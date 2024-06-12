import { ALL_BADGES, DEFAULT_BADGES } from '@/badges'
import { DEFAULT_DATA_CACHED } from '@/default-git-data'

import { AIProvider } from '@/types/ai'
import { NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import { getGenerationAI, getLanguages, getLicense } from '@/services/github'

import { getPrerequisites, getRepositoryTreeDirectory } from './github'
import {
  getMonorepoSummaryPrompt,
  getOverviewPrompt,
  getProjectSummaryPrompt,
  getSettingUpPrompt,
  getTechStackPrompt
} from './prompt-factory'

export const readmeFactory = async ({
  repositoryData,
  section,
  providerAISelected
}: {
  repositoryData: GitRepository
  section: NodeName
  providerAISelected: AIProvider
}) => {
  const { repoName, owner, branch, language, urlRepository, description } = repositoryData

  if (section === NodeName.LICENSE) {
    return getLicenseSection({ repoName, owner })
  } else if (section === NodeName.OVERVIEW) {
    return getOverviewSection({
      branch,
      description,
      language,
      owner,
      repoName,
      providerAISelected
    })
  } else if (section === NodeName.PROJECT_STRUCTURE) {
    return getProjectStructureSection({ repoName, owner, branch })
  } else if (section === NodeName.PROJECT_SUMMARY) {
    return getProjectSummarySection({ repoName, owner, branch, language, providerAISelected })
  } else if (section === NodeName.RUN_LOCALLY) {
    const data = {
      mainLanguage: language,
      repoName,
      urlRepository
    }
    return { data }
  } else if (section === NodeName.SETTING_UP) {
    return getSettingUpSection({ repoName, owner, providerAISelected })
  } else if (section === NodeName.TECH_STACK) {
    return getTechStackSection({ repoName, owner, branch, language, providerAISelected })
  } else if (section === NodeName.BADGE) {
    return getBadgesSection({ repoName, owner, language })
  } else if (section === NodeName.PREREQUISITES) {
    return getPrerequisitesSection({ repoName, owner, language, branch })
  } else if (section === NodeName.CONTRIBUTORS) {
    const data = {
      repository: repoName,
      owner
    }
    return { data }
  } else if (section === NodeName.MONOREPO_SUMMARY) {
    return getMonorepoSummarySection({ repoName, owner, language, branch, providerAISelected })
  }
}

export const getLicenseSection = async ({
  repoName,
  owner
}: {
  repoName: string
  owner: string
}) => {
  const response = await getLicense({
    repoName,
    owner
  })
  return response
}

export const getOverviewSection = async ({
  branch,
  description,
  language,
  owner,
  repoName,
  providerAISelected
}: {
  branch: string
  description: string
  language: string
  owner: string
  repoName: string
  providerAISelected: AIProvider
}) => {
  const { data: prompt, error } = await getOverviewPrompt({
    branch,
    description,
    language,
    owner,
    repoName
  })

  if (error || !prompt) return { error }

  const response = await getGenerationAI({
    format: 'string',
    prompt: prompt,
    providerAISelected
  })

  return response
}

export const getProjectStructureSection = async ({
  repoName,
  owner,
  branch
}: {
  repoName: string
  owner: string
  branch: string
}) => {
  const data = await getRepositoryTreeDirectory({
    repoName,
    owner: owner,
    branch
  })

  return data
}

export const getProjectSummarySection = async ({
  repoName,
  owner,
  branch,
  language,
  providerAISelected
}: {
  repoName: string
  owner: string
  branch: string
  language: string
  providerAISelected: AIProvider
}) => {
  const { data: prompt, error } = await getProjectSummaryPrompt({
    owner,
    repoName,
    branch,
    language
  })

  if (error || !prompt) return { error }

  const response = await getGenerationAI({
    format: 'json',
    prompt,
    providerAISelected
  })

  return response
}

export const getSettingUpSection = async ({
  owner,
  repoName,
  providerAISelected
}: {
  owner: string
  repoName: string
  providerAISelected: AIProvider
}) => {
  const { data: prompt, error } = await getSettingUpPrompt({
    owner,
    repoName
  })

  if (error || prompt == null) return { error }

  if (prompt === '') {
    return { data: [] }
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt,
      providerAISelected
    })
    return response
  }
}

export const getTechStackSection = async ({
  repoName,
  owner,
  branch,
  language,
  providerAISelected
}: {
  repoName: string
  owner: string
  branch: string
  language: string
  providerAISelected: AIProvider
}) => {
  const { data: prompt, error } = await getTechStackPrompt({
    branch,
    language,
    owner,
    repoName
  })

  if (error || prompt == null) return { error }

  if (prompt === '') {
    return { data: [] }
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt,
      providerAISelected
    })
    return response
  }
}

export const getBadgesSection = async ({
  owner,
  repoName,
  language
}: {
  owner: string
  repoName: string
  language: string
}) => {
  const { data: languages, error } = await getLanguages({
    owner,
    repoName
  })

  if (error) return { error }

  const languagesWithoutMainLanguage = Object.keys(languages)
    .filter((lang) => lang.toLocaleLowerCase() !== language.toLocaleLowerCase())
    .map((lang) => lang.toLowerCase())

  const programmingBadges = ALL_BADGES.filter((badge) =>
    languagesWithoutMainLanguage.includes(badge.id.toLowerCase())
  ).map(({ name, url }) => ({ name, url, isGithub: false }))

  const res = {
    repoName,
    owner,
    badges: DEFAULT_BADGES.concat(programmingBadges)
  }

  return { data: res }
}

export const getPrerequisitesSection = async ({
  repoName,
  owner,
  branch,
  language
}: {
  repoName: string
  owner: string
  branch: string
  language: string
}) => {
  const response = await getPrerequisites({
    defaultBranch: branch,
    language,
    owner,
    repoName
  })

  return response
}

export const getMonorepoSummarySection = async ({
  repoName,
  owner,
  branch,
  language,
  providerAISelected
}: {
  repoName: string
  owner: string
  branch: string
  language: string
  providerAISelected: AIProvider
}) => {
  const { data: prompt, error } = await getMonorepoSummaryPrompt({
    repoName,
    owner,
    language,
    branch
  })

  if (error || prompt == null) return { error }

  if (prompt === '') {
    return { data: DEFAULT_DATA_CACHED[NodeName.MONOREPO_SUMMARY] }
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt,
      providerAISelected
    })

    return response
  }
}
