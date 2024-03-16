import { ALL_BADGES, DEFAULT_BADGES } from '@/badges'
import { DEFAULT_DATA_CACHED } from '@/default-git-data'

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
  section
}: {
  repositoryData: GitRepository
  section: NodeName
}) => {
  const { repoName, owner, branch, language, urlRepository, description } = repositoryData

  if (section === NodeName.LICENSE) {
    return getLicenseSection({ repoName, owner })
  } else if (section === NodeName.OVERVIEW) {
    return getOverviewSection({ branch, description, language, owner, repoName })
  } else if (section === NodeName.PROJECT_STRUCTURE) {
    return getProjectStructureSection({ repoName, owner, branch })
  } else if (section === NodeName.PROJECT_SUMMARY) {
    return getProjectSummarySection({ repoName, owner, branch, language })
  } else if (section === NodeName.RUN_LOCALLY) {
    return {
      mainLanguage: language,
      repoName,
      urlRepository
    }
  } else if (section === NodeName.SETTING_UP) {
    return getSettingUpSection({ repoName, owner })
  } else if (section === NodeName.TECH_STACK) {
    return getTechStackSection({ repoName, owner, branch, language })
  } else if (section === NodeName.BADGE) {
    return getBadgesSection({ repoName, owner, language })
  } else if (section === NodeName.PREREQUISITES) {
    return getPrerequisitesSection({ repoName, owner, language, branch })
  } else if (section === NodeName.CONTRIBUTORS) {
    return {
      repository: repoName,
      owner
    }
  } else if (section === NodeName.MONOREPO_SUMMARY) {
    return getMonorepoSummarySection({ repoName, owner, language, branch })
  }
}

export const getLicenseSection = async ({
  repoName,
  owner
}: {
  repoName: string
  owner: string
}) => {
  const data = await getLicense({
    repoName,
    owner
  })

  return data
}

export const getOverviewSection = async ({
  branch,
  description,
  language,
  owner,
  repoName
}: {
  branch: string
  description: string
  language: string
  owner: string
  repoName: string
}) => {
  const prompt = await getOverviewPrompt({
    branch,
    description,
    language,
    owner,
    repoName
  })

  const response = await getGenerationAI({
    format: 'string',
    prompt
  })

  if (!response || response.message || response.name === 'Error') {
    throw new Error(response.message)
  }

  return response.data
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
  language
}: {
  repoName: string
  owner: string
  branch: string
  language: string
}) => {
  const prompt = await getProjectSummaryPrompt({
    owner,
    repoName,
    branch,
    language
  })

  if (prompt === '') {
    return []
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt
    })

    if (!response || response.message || response.name === 'Error') {
      throw new Error(response.message)
    }

    return response.data.data
  }
}

export const getSettingUpSection = async ({
  owner,
  repoName
}: {
  owner: string
  repoName: string
}) => {
  const prompt = await getSettingUpPrompt({
    owner,
    repoName
  })
  if (prompt === '') {
    return []
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt
    })

    if (!response || response.message || response.name === 'Error') {
      throw new Error(response.message)
    }

    return response.data.data
  }
}

export const getTechStackSection = async ({
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
  const prompt = await getTechStackPrompt({
    branch,
    language,
    owner,
    repoName
  })

  if (prompt === '') {
    return []
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt
    })

    if (!response || response.message || response.name === 'Error') {
      throw new Error(response.message)
    }

    return response.data.dependencies
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
  const languages = await getLanguages({
    owner,
    repoName
  })
  const languagesWithoutMainLanguage = Object.keys(languages)
    .filter((lang) => lang.toLocaleLowerCase() !== language.toLocaleLowerCase())
    .map((lang) => lang.toLowerCase())

  const programmingBadges = ALL_BADGES.filter((badge) =>
    languagesWithoutMainLanguage.includes(badge.id.toLowerCase())
  ).map(({ name, url }) => ({ name, url, isGithub: false }))

  return {
    repoName,
    owner,
    badges: DEFAULT_BADGES.concat(programmingBadges)
  }
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
  const data = await getPrerequisites({
    defaultBranch: branch,
    language,
    owner,
    repoName
  })

  return data
}

export const getMonorepoSummarySection = async ({
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
  const prompt = await getMonorepoSummaryPrompt({
    repoName,
    owner,
    language,
    branch
  })

  if (prompt === '') {
    return DEFAULT_DATA_CACHED[NodeName.MONOREPO_SUMMARY]
  } else {
    const response = await getGenerationAI({
      format: 'json',
      prompt
    })

    if (!response || response.message || response.name === 'Error') {
      throw new Error(response.message)
    }

    return response.data.data
  }
}
