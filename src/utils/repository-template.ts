import { BadgeName, GitRepository, Section } from '@/types'
import { LANGUAGES_SETUP, README_SECTIONS } from '@/constants'
import { getBadgeByName, getDependencies, getRepositoryTreeDirectory } from '@/utils/github'
import {
  generateProjectSummary,
  generateGuideEnvironmentVariables,
  generateTechStack,
  getPromptRandomOverview,
  getPromptOverviewWithDependencies
} from '@/utils/prompts'
import { getSetupCommands } from '@/utils/commands'
import {
  getContributors,
  getFileContents,
  getRepositoryStructure,
  getLicense
} from '@/services/github'

export class RepositoryTemplate {
  private urlRepository: string
  private repoName: string
  private repoOwner: string
  private description: string
  private language: string
  private defaultBranch: string

  constructor(data: GitRepository) {
    const { urlRepository, repoName, owner, description, language, branch } = data
    this.urlRepository = urlRepository
    this.repoName = repoName
    this.repoOwner = owner
    this.description = description ?? ''
    this.language = language
    this.defaultBranch = branch
  }

  getBanner() {
    return `<p style="text-align:center;"><a href=${this.urlRepository} target="_blank"><img src='/placeholder.jpg' width="100%" alt="Banner" /></a></p>`
  }

  getRepoName() {
    return this.repoName
  }

  getRepoOwner() {
    return this.repoOwner
  }

  async getOverview() {
    let promptOverview = getPromptRandomOverview({
      repositoryName: this.repoName,
      projectDescription: this.description
    })

    const dependencies = await getDependencies({
      repoName: this.repoName,
      owner: this.repoOwner,
      language: this.language,
      defaultBranch: this.defaultBranch
    })

    if (!dependencies) return promptOverview

    promptOverview = getPromptOverviewWithDependencies({
      repositoryName: this.repoName,
      dependencies,
      projectDescription: this.description
    })
    return promptOverview
  }

  async getTechStack() {
    const dependencies = await getDependencies({
      repoName: this.repoName,
      owner: this.repoOwner,
      language: this.language,
      defaultBranch: this.defaultBranch
    })

    if (!dependencies) return ''

    const promptTechStack = generateTechStack({ dependencies, language: this.language })
    return promptTechStack
  }

  async getEnvironmentVariablesGuide() {
    const fileEnviromentContent = await getFileContents({
      path: '.env.example',
      owner: this.repoOwner,
      repoName: this.repoName
    })

    if (!fileEnviromentContent) return null

    const promptGuideEnvironmentVariables = generateGuideEnvironmentVariables({
      environmentVars: fileEnviromentContent
    })

    return promptGuideEnvironmentVariables
  }

  getRunningLocally() {
    const setup = LANGUAGES_SETUP.find(({ language }) => language === this.language)

    return `## ${README_SECTIONS['run-locally']}

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
    return `## ${README_SECTIONS['acknowledgements']}\n\n\`- [Awesome Tool](https://awesometool.link)\`\n\n\`- [Awesome Inspiration](https://awesomeinsp.link)\`\n\n`
  }

  getRoadmap() {
    return `## ${README_SECTIONS['roadmap']}\n\n- [X] **Task 1:** Implement feature one.\n\n- [   ] **Task 2:** Develop feature two.\n\n- [   ] **Task 3:** Enhance X.\n\n`
  }

  getChangelog() {
    return `## ${README_SECTIONS['changelog']}\n\n> All notable changes to this project will be documented in this section.\n\n#### [Version X.X.X] - YYYY-MM-DD\n\n
- New features or enhancements added in this release.\n\n- Fixes to errors or problems.\n\n`
  }

  // useful for vscode extensions
  getCommands() {
    return `## ${README_SECTIONS['commands']}\n\nThis extension contributes the following commands to the Command palette:\n\n- \`Command name\`: Command description.\n\n- \`Authenticate\`: Command description.\n\n`
  }

  getFaq() {
    return `## ${README_SECTIONS['faq']}\n\n#### 1. What is this project about?\n\nThis project aims to **briefly describe your project's purpose and goals**.\n\n
#### 2. Can I contribute to this project?\n\nYes, we welcome contributions! Please refer to our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to contribute.\n\n
#### 3. Any other question\n\nYour answer.\n\n`
  }

  async getProjectStructure() {
    const tree = await getRepositoryTreeDirectory({
      repoName: this.repoName,
      owner: this.repoOwner,
      branch: this.defaultBranch
    })
    return `## ${README_SECTIONS['project-structure']}\n\n\`\`\`bash\n${tree}\`\`\`\n\n`
  }

  async getLicense() {
    const header = `## ${README_SECTIONS['license']}\n\n`
    const license = await getLicense({
      repoName: this.repoName,
      owner: this.repoOwner
    })
    if (!license) return `${header}[**Add Your License**](https://choosealicense.com)\n\n`
    return `${header}This project is licensed under the **${license.name}** - see the [**${license.name}**](${license.url}) file for details.\n\n`
  }

  getDeploy() {
    return `## ${README_SECTIONS['deploy']}\n\n\`[Application name](Your App URL)\`\n\n`
  }

  async getTableContributors({ contributorsPerRow }: { contributorsPerRow: number }) {
    const contributors = await getContributors({
      repoName: this.repoName,
      owner: this.repoOwner
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
    let table = `## ${README_SECTIONS['contributors']}\n\n<table style="border:1px solid #404040;text-align:center;width:100%">`
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
    return `## ${README_SECTIONS['contributors']}\n\n<a href="https://github.com/${this.repoOwner}/${this.repoName}/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=${this.repoOwner}/${this.repoName}" /></a>\n\n`
  }

  getBadges(...args: BadgeName[]) {
    let html = `<p style="text-align:center;">`
    args.forEach((badge: BadgeName) => {
      const res = getBadgeByName({
        repoName: this.repoName,
        owner: this.repoOwner,
        badge
      })
      const { label, url } = res
      html += `<img src="${url}" alt="${label}" />\n`
    })
    html += `</p>\n\n`
    return html
  }

  getPrerequisites() {
    return `## ${README_SECTIONS['prerequisites']}\n\n- Prerequisite 1\n\n- Prerequisite 2\n\n`
  }

  async getProjectSummary() {
    const structure = await getRepositoryStructure({
      repoName: this.repoName,
      owner: this.repoOwner,
      branch: this.defaultBranch
    })
    if (!structure) return ''

    const directories = structure
      .filter((files) => files.type === 'tree')
      .map((files) => files.path)
    const promptProjectSummary = generateProjectSummary({
      directories,
      mainLanguage: this.language
    })
    return promptProjectSummary
  }

  getTableContents({ sections }: { sections: Section[] }) {
    const header = `## ${README_SECTIONS['table-contents']}\n\n`
    let table = ''
    sections.forEach((section) => {
      const sectionValue = README_SECTIONS[section]
      table += `* [${sectionValue}](#${section})\n\n`
    })
    return `${header}${table}`
  }
}
