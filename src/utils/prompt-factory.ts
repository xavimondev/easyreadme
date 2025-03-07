import { getDependencies, getMonorepoData } from '@/utils/github'
import {
  generateMonorepoSummaryPrompt,
  generateOverviewPrompt,
  generateOverviewWithDependenciesPrompt,
  generateProjectSummaryPrompt,
  generateSettingUpPrompt,
  generateTechStackPrompt
} from '@/utils/prompts'
import { getFileContents, getRepositoryStructure } from '@/services/github'

export const getOverviewPrompt = async ({
  repoName,
  description,
  owner,
  language,
  branch
}: {
  repoName: string
  description: string
  owner: string
  language: string
  branch: string
}) => {
  const { data: dependencies, error } = await getDependencies({
    repoName: repoName,
    owner: owner,
    language: language,
    defaultBranch: branch
  })

  if (error) return { error }

  if (!dependencies) {
    const prompt = generateOverviewPrompt({
      repositoryName: repoName,
      projectDescription: description
    })
    return { data: prompt }
  }

  const prompt = generateOverviewWithDependenciesPrompt({
    repositoryName: repoName,
    dependencies,
    projectDescription: description
  })
  return { data: prompt }
}

export const getProjectSummaryPrompt = async ({
  repoName,
  owner,
  language,
  branch
}: {
  repoName: string
  owner: string
  language: string
  branch: string
}) => {
  const { data, error } = await getRepositoryStructure({
    repoName: repoName,
    owner,
    branch
  })

  if (error || !data) return { error }

  const directories = data.filter((files) => files.type === 'tree').map((files) => files.path)
  const promptProjectSummary = generateProjectSummaryPrompt({
    directories,
    mainLanguage: language
  })

  return { data: promptProjectSummary }
}

export const getSettingUpPrompt = async ({
  owner,
  repoName
}: {
  owner: string
  repoName: string
}) => {
  const { data: fileEnviromentContent, error } = await getFileContents({
    path: '.env.example',
    owner,
    repoName
  })

  if (error) return { error }

  if (!fileEnviromentContent) return { data: '' }

  const promptGuideEnvironmentVariables = generateSettingUpPrompt({
    environmentVars: fileEnviromentContent
  })

  return { data: promptGuideEnvironmentVariables }
}

export const getTechStackPrompt = async ({
  repoName,
  owner,
  language,
  branch
}: {
  repoName: string
  owner: string
  language: string
  branch: string
}) => {
  const { data: dependencies, error } = await getDependencies({
    repoName: repoName,
    owner,
    language: language,
    defaultBranch: branch
  })

  if (error) return { error }
  if (!dependencies) return { data: '' }

  const promptTechStack = generateTechStackPrompt({ dependencies, language: language })
  return { data: promptTechStack }
}

export const getMonorepoSummaryPrompt = async ({
  repoName,
  owner,
  language,
  branch
}: {
  repoName: string
  owner: string
  language: string
  branch: string
}) => {
  const { data: monorepoData, error } = await getMonorepoData({
    owner,
    language,
    repoName,
    defaultBranch: branch
  })

  if (error) return { error }

  if (!monorepoData) return { data: '' }

  const prompt = generateMonorepoSummaryPrompt({
    repositoryName: repoName,
    monorepoStructure: JSON.stringify(monorepoData)
  })

  return { data: prompt }
}
