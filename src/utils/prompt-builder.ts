import { LANGUAGES_FILES_PARSERS, LANGUAGES_SETUP } from '@/constants'
import {
  getFileContents,
  getMainLanguage,
  getRepositoryDetails,
  getRepositoryStructure,
  getRepositoryTreeDirectory
} from '@/utils/git-repository'
import {
  generateGuideEnvironmentVariables,
  generateTechStack,
  getPromptOverview
} from '@/utils/prompts'
import { getSetupCommands } from '@/utils/commands'

export class PromptBuilder {
  private urlRepository: string = 'https://github.com/xavimondev/boostgrammar.io'
  private repoName: string | undefined
  private repoOwner: string | undefined

  constructor(urlRepository: string) {
    this.urlRepository = urlRepository
    const { repoName, owner } = getRepositoryDetails({ urlRepository })
    this.repoName = repoName
    this.repoOwner = owner
  }

  getBanner() {
    return `<p style="text-align:center;"><a href=${this.urlRepository} target="_blank"><img src='/placeholder.png' width="100%" alt="Banner" /></a></p>`
  }

  getRepoName() {
    return this.repoName
  }

  getRepoOwner() {
    return this.repoOwner
  }

  async getOverview() {
    const treeString = await getRepositoryTreeDirectory({
      urlRepository: this.urlRepository
    })
    const promptOverview = getPromptOverview({
      repositoryName: this.repoName as string,
      directoryTree: treeString
    })
    return promptOverview
  }

  async getTechStack() {
    const mainLanguage = await getMainLanguage({ urlRepository: this.urlRepository })
    const languageSetup = LANGUAGES_SETUP.find((item) => item.language === mainLanguage)
    const defaultSetup = `## Stack\n\n\`\`\`sh\nINSERT TECH STACK\`\`\``
    if (!languageSetup || languageSetup.fileDependencies.length === 0) {
      return defaultSetup
    }

    const tree = await getRepositoryStructure({ urlRepository: this.urlRepository }) // return the tree
    if (!tree) return defaultSetup

    const fileDependencies = languageSetup.fileDependencies // [package.json, ...]
    // look each file from fileDependencies against tree to find the path
    const filePath = fileDependencies.find((file) => tree.find((item) => item.path.includes(file)))
    if (!filePath) return defaultSetup

    // once I have the path, fetch dependency file's contents
    const fileDependenciesContent = await getFileContents({
      path: filePath,
      owner: this.repoOwner as string,
      repository: this.repoName as string
    })
    if (!fileDependenciesContent) return defaultSetup

    // split path like this -> src/main/go.mod = [src,main,go.mod]
    const segments = filePath.split('/')
    const lastSegment = segments.at(-1) as string // -> go.mod
    const parser = LANGUAGES_FILES_PARSERS[lastSegment]
    const dependencies = parser({ content: fileDependenciesContent })
    const promptTechStack = generateTechStack({ dependencies, language: mainLanguage })
    return promptTechStack
  }

  async getEnvironmentVariablesGuide() {
    const fileEnviromentContent = await getFileContents({
      path: '.env.example',
      owner: this.repoOwner as string,
      repository: this.repoName as string
    })

    if (!fileEnviromentContent) return ''

    const promptGuideEnvironmentVariables = generateGuideEnvironmentVariables({
      environmentVars: fileEnviromentContent
    })

    return promptGuideEnvironmentVariables
  }

  async getRunningLocally() {
    const mainLanguage = await getMainLanguage({ urlRepository: this.urlRepository }) // JavaScript
    const setup = LANGUAGES_SETUP.find(({ language }) => language === mainLanguage)

    return `## Run locally

1.Clone the ${this.repoName} repository:

\`\`\`sh
git clone ${this.urlRepository}
\`\`\`

2.Install dependencies:

${setup ? getSetupCommands({ commands: setup.commands['install'] }) : 'Insert INSTALL commands.'}

3.Start the development mode:

${setup ? getSetupCommands({ commands: setup.commands['run'] }) : 'Insert RUN commands.'}
`
  }
}
