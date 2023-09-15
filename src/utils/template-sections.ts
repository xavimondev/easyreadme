import { LANGUAGES_FILES_PARSERS, LANGUAGES_SETUP } from '@/constants'
import {
  getFileContents,
  getMainLanguage,
  getRepositoryDetails,
  getRepositoryStructure,
  getRepositoryTreeDirectory
} from './git-repository'
import { generateGuideEnvironmentVariables, generateTechStack, getPromptOverview } from './prompts'

export const getBanner = ({ urlRepository }: { urlRepository: string }) => {
  return `<p style="text-align:center;">
  <a href=${urlRepository} target="_blank">
    <img src='/placeholder.png' width="100%" alt="Banner" />
  </a>
</p>`
}

export const getOverview = async ({ urlRepository }: { urlRepository: string }) => {
  const { repoName } = getRepositoryDetails({ urlRepository })
  if (!repoName) return ``

  const treeString = await getRepositoryTreeDirectory({ urlRepository })
  const promptOverview = getPromptOverview({ repositoryName: repoName, directoryTree: treeString })
  const overview = '' // TODO: Call endpoint using IA
  return `# ${repoName}

  ${overview}`
}

export const getTechStack = async ({ urlRepository }: { urlRepository: string }) => {
  const mainLanguage = await getMainLanguage({ urlRepository }) // JavaScript
  const languageSetup = LANGUAGES_SETUP.find((item) => item.language === mainLanguage) //
  const defaultSetup = `## Stack\n\n\`\`\`sh\nINSERT TECH STACK\`\`\``
  if (!languageSetup || languageSetup.fileDependencies.length === 0) {
    return defaultSetup
  }

  const tree = await getRepositoryStructure({ urlRepository }) // return the tree
  if (!tree) return defaultSetup

  const fileDependencies = languageSetup.fileDependencies // [package.json, ...]
  // look each file from fileDependencies against tree to find the path
  const filePath = fileDependencies.find((file) => tree.find((item) => item.path.includes(file)))
  if (!filePath) return defaultSetup

  const { owner, repoName } = getRepositoryDetails({
    urlRepository
  })

  // once I have the path, fetch dependency file's contents
  const fileDependenciesContent = await getFileContents({
    path: filePath,
    owner: owner as string,
    repository: repoName as string
  })
  if (!fileDependenciesContent) return null

  // split path like this -> src/main/go.mod = [src,main,go.mod]
  const segments = filePath.split('/')
  const lastSegment = segments.at(-1) as string // -> go.mod
  const parser = LANGUAGES_FILES_PARSERS[lastSegment]
  const dependencies = parser({ content: fileDependenciesContent })
  const promptTechStack = generateTechStack({ dependencies, language: mainLanguage })
  const response = '' // TODO: Call endpoint using IA
  return `## Stack

  ${response}`
}

export const getEnvironmentVariablesGuide = async ({
  urlRepository
}: {
  urlRepository: string
}) => {
  const { owner, repoName } = getRepositoryDetails({
    urlRepository
  })

  const fileEnviromentContent = await getFileContents({
    path: '.env.example',
    owner: owner as string,
    repository: repoName as string
  })

  if (!fileEnviromentContent) return ''

  const promptGuideEnvironmentVariables = generateGuideEnvironmentVariables({
    environmentVars: fileEnviromentContent
  })

  const result = ''

  return `# Setting up

${result}`
}

export const getRunningLocally = ({
  mainLanguage,
  urlRepository
}: {
  mainLanguage: string
  urlRepository: string
}) => {
  const setup = LANGUAGES_SETUP.find(({ language }) => language === mainLanguage)
  const repository = getRepositoryDetails({ urlRepository })

  return `## Run locally

1.Clone the ${repository.repoName} repository:

\`\`\`sh
git clone ${urlRepository}
\`\`\`

3.Install dependencies:

${setup ? getSetupCommands({ commands: setup.commands['install'] }) : 'Insert install commands.'}

4.Start the development mode:

${setup ? getSetupCommands({ commands: setup.commands['run'] }) : 'Insert run commands.'}
`
}

const getSetupCommands = ({ commands }: { commands: string[] }) => {
  let setup = ''
  commands.forEach((command) => {
    setup += `
    \`\`\`
      ${command}\n
    \`\`\`
    `
  })
  return setup
}
