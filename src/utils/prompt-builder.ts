import { BadgeName, Section } from '@/types'
import { LANGUAGES_FILES_PARSERS, LANGUAGES_SETUP, README_SECTIONS } from '@/constants'
import {
  getBadgeByName,
  getContributors,
  getFileContents,
  getLicense,
  getMainLanguage,
  getRepositoryDetails,
  getRepositoryStructure,
  getRepositoryTreeDirectory
} from '@/utils/git-repository'
import {
  generateProjectSummary,
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

    if (!fileEnviromentContent) return null

    const promptGuideEnvironmentVariables = generateGuideEnvironmentVariables({
      environmentVars: fileEnviromentContent
    })

    return promptGuideEnvironmentVariables
  }

  async getRunningLocally() {
    const mainLanguage = await getMainLanguage({ urlRepository: this.urlRepository })
    const setup = LANGUAGES_SETUP.find(({ language }) => language === mainLanguage)

    return `## Run locally

1.Clone the ${this.repoName} repository:

\`\`\`sh
git clone ${this.urlRepository}
\`\`\`

2.Install dependencies:

${
  setup
    ? getSetupCommands({ commands: setup.commands['install'] })
    : `\`\`\`sh 
Insert INSTALL commands 
\`\`\``
}

3.Start the development mode:

${
  setup
    ? getSetupCommands({ commands: setup.commands['run'] })
    : `\`\`\`sh 
Insert RUN commands 
\`\`\``
}
`
  }

  getAcknowledgments() {
    return `## Acknowledgements\n\n\`- [Awesome Tool](https://awesometool.link)\`\n\n\`- [Awesome Inspiration](https://awesomeinsp.link)\`\n\n`
  }

  getRoadmap() {
    return `## Roadmap\n\n- [X] **Task 1:** Implement feature one.\n\n- [   ] **Task 2:** Develop feature two.\n\n- [   ] **Task 3:** Enhance X.\n\n`
  }

  getChangelog() {
    return `## Changelog\n\n> All notable changes to this project will be documented in this section.\n\n#### [Version X.X.X] - YYYY-MM-DD\n\n
- New features or enhancements added in this release.\n\n- Fixes to errors or problems.\n\n`
  }

  // useful for vscode extensions
  getCommands() {
    return `## Commands\n\nThis extension contributes the following commands to the Command palette:\n\n- \`Command name\`: Command description.\n\n- \`Authenticate\`: Command description.\n\n`
  }

  getFaq() {
    return `## FAQ\n\n#### 1. What is this project about?\n\nThis project aims to **briefly describe your project's purpose and goals**.\n\n
#### 2. Can I contribute to this project?\n\nYes, we welcome contributions! Please refer to our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to contribute.\n\n
#### 3. Any other question\n\nYour answer.\n\n`
  }

  async getProjectStructure() {
    const tree = await getRepositoryTreeDirectory({ urlRepository: this.urlRepository })
    return `## Project Structure\n\n\`\`\`bash\n${tree}\`\`\`\n\n`
  }

  async getLicense() {
    const header = `## License\n\n`
    const license = await getLicense({
      repoName: this.repoName as string,
      owner: this.repoOwner as string
    })
    if (!license) return `${header}[**Add Your License**](https://choosealicense.com)\n\n`
    return `${header}This project is licensed under the **${license.name}** - see the [**${license.name}**](${license.url}) file for details.\n\n`
  }

  getDeploy() {
    return `## Deploy\n\n\`[Application name](Your App URL)\`\n\n`
  }

  async getTableContributors({ contributorsPerRow }: { contributorsPerRow: number }) {
    const contributors = await getContributors({
      repoName: this.repoName as string,
      owner: this.repoOwner as string
    })
    if (!contributors || contributors.length === 0) return ''

    const listContributors = contributors.map(
      ({ login, avatar_url, html_url, contributions }: any) => ({
        username: login,
        avatar: avatar_url,
        profileUrl: html_url,
        contributions: contributions
      })
    )
    let table = `## Contributors\n\n<table style="border:1px solid #404040;text-align:center;width:100%">`
    let totalCells = 1
    const MAX_WIDTH_ROW = 100
    const width = (MAX_WIDTH_ROW / contributorsPerRow).toFixed(2)

    listContributors.forEach((contributor: any) => {
      const { username, avatar, profileUrl, contributions } = contributor
      if (totalCells === 1) {
        table += `<tr>`
      }
      const contributionsText = contributions > 1 ? 'contributions' : 'contribution'
      table += `<td style="width:${width}%;border:1px solid #404040;">
        <a href="${profileUrl}" spellcheck="false">
          <img src="${avatar}?s=100" width="100px;" alt="${username}"/>
          <br />
          <b>${username}</b>
        </a>
        <br />
        <a href="https://github.com/${this.repoOwner}/${this.repoName}/commits?author=${username}" title="Contributions" spellcheck="false">
          ${contributions} ${contributionsText}
        </a>
      </td>`

      if (totalCells === contributorsPerRow) {
        table += `</tr>`
        totalCells = 1
      } else {
        totalCells++
      }
    })
    table += `</table>\n\n`
    return table
  }

  getGalleryContributors() {
    return `## Contributors\n\n<a href="https://github.com/${this.repoOwner}/${this.repoName}/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=${this.repoOwner}/${this.repoName}" /></a>\n\n`
  }

  getBadges(...args: BadgeName[]) {
    let html = `<p style="text-align:center;">`
    args.forEach((badge: BadgeName) => {
      const res = getBadgeByName({
        repoName: this.repoName as string,
        owner: this.repoOwner as string,
        badge
      })
      const { label, url } = res
      html += `<img src="${url}" alt=${label} />\n`
    })
    html += `</p>\n\n`
    return html
  }

  getPrerequisites() {
    return `## Prerequisites\n\n- Prerequisite 1\n\n- Prerequisite 2\n\n`
  }

  async getProjectSummary() {
    const structure = await getRepositoryStructure({ urlRepository: this.urlRepository })
    if (!structure) return ''

    const directories = structure
      .filter((files) => files.type === 'tree')
      .map((files) => files.path)
    const mainLanguage = await getMainLanguage({ urlRepository: this.urlRepository })
    const promptProjectSummary = generateProjectSummary({
      directories,
      mainLanguage
    })
    return promptProjectSummary
  }

  getTableContents({ sections }: { sections: Section[] }) {
    const header = `## Table of Contents\n\n`
    let table = ''
    sections.forEach((section) => {
      const sectionValue = README_SECTIONS[section]
      table += `* [${sectionValue}](#${section})\n\n`
    })
    return `${header}${table}`
  }
}
