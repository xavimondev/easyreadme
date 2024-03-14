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
  let promptOverview = generateOverviewPrompt({
    repositoryName: repoName,
    projectDescription: description
  })

  const dependencies = await getDependencies({
    repoName: repoName,
    owner: owner,
    language: language,
    defaultBranch: branch
  })

  if (!dependencies) return promptOverview

  promptOverview = generateOverviewWithDependenciesPrompt({
    repositoryName: repoName,
    dependencies,
    projectDescription: description
  })
  return promptOverview
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
  const structure = await getRepositoryStructure({
    repoName: repoName,
    owner,
    branch
  })
  if (!structure) return ''

  const directories = structure.filter((files) => files.type === 'tree').map((files) => files.path)
  const promptProjectSummary = generateProjectSummaryPrompt({
    directories,
    mainLanguage: language
  })
  return promptProjectSummary
}

export const getSettingUpPrompt = async ({
  owner,
  repoName
}: {
  owner: string
  repoName: string
}) => {
  const fileEnviromentContent = await getFileContents({
    path: '.env.example',
    owner,
    repoName
  })

  if (!fileEnviromentContent) return ''

  const promptGuideEnvironmentVariables = generateSettingUpPrompt({
    environmentVars: fileEnviromentContent
  })

  return promptGuideEnvironmentVariables
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
  const dependencies = await getDependencies({
    repoName: repoName,
    owner,
    language: language,
    defaultBranch: branch
  })

  if (!dependencies) return ''

  const promptTechStack = generateTechStackPrompt({ dependencies, language: language })
  return promptTechStack
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
  const monorepoData = await getMonorepoData({
    owner,
    language,
    repoName,
    defaultBranch: branch
  })

  if (!monorepoData) return ''

  const prompt = generateMonorepoSummaryPrompt({
    repositoryName: repoName,
    monorepoStructure: JSON.stringify(monorepoData)
  })

  return prompt
}
