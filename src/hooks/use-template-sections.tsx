import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { useTemplate } from '@/store'
import { BadgeName, Section } from '@/types'
import { PromptBuilder } from '@/utils/prompt-builder'
import { README_SECTIONS } from '@/constants'

export function useTemplateSections() {
  const addContentToTemplate = useTemplate((state) => state.addContentToTemplate)
  const { complete, setCompletion } = useCompletion({
    id: 'readme',
    onFinish: (_prompt, completion) => {
      setCompletion('')
      addContentToTemplate(`${completion}\n\n`)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const banner = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const banner = promptBuilder.getBanner()
    addContentToTemplate(`${banner}\n\n`)
  }

  const overview = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    addContentToTemplate(`# ${promptBuilder.getRepoName()}\n\n`)
    const promptOverview = await promptBuilder.getOverview()
    await complete(promptOverview)
  }

  const techStack = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    addContentToTemplate(`## Stack\n\n`)
    const promptTechStack = await promptBuilder.getTechStack()
    await complete(promptTechStack)
  }

  const settingUp = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const promptSettingUp = await promptBuilder.getEnvironmentVariablesGuide()
    const header = `## ${README_SECTIONS['setting-up']}\n\n`
    if (!promptSettingUp) {
      addContentToTemplate(`${header}#### Your Environment Variable\n\n- Step 1\n\n- Step 2\n\n`)
      return
    }

    addContentToTemplate(`${header}`)
    await complete(promptSettingUp)
  }

  const runningLocally = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const runningLocally = await promptBuilder.getRunningLocally()
    addContentToTemplate(runningLocally)
  }

  const acknowledgments = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const acknowledgments = promptBuilder.getAcknowledgments()
    addContentToTemplate(acknowledgments)
  }

  const roadmap = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const roadmap = promptBuilder.getRoadmap()
    addContentToTemplate(roadmap)
  }

  const changelog = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const changelog = promptBuilder.getChangelog()
    addContentToTemplate(changelog)
  }

  const commands = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const commands = promptBuilder.getCommands()
    addContentToTemplate(commands)
  }

  const faq = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const faq = promptBuilder.getFaq()
    addContentToTemplate(faq)
  }

  const projectStructure = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const projectStructure = await promptBuilder.getProjectStructure()
    addContentToTemplate(projectStructure)
  }

  const license = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const license = await promptBuilder.getLicense()
    addContentToTemplate(license)
  }

  const deploy = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const deploy = promptBuilder.getDeploy()
    addContentToTemplate(deploy)
  }

  const tableContributors = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const table = await promptBuilder.getTableContributors({ contributorsPerRow: 7 })
    addContentToTemplate(table)
  }

  const galleryContributors = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const contributors = promptBuilder.getGalleryContributors()
    addContentToTemplate(contributors)
  }

  const badges = ({
    promptBuilder,
    listBadges = ['stars', 'contributors', 'top_language', 'license']
  }: {
    promptBuilder: PromptBuilder
    listBadges?: BadgeName[]
  }) => {
    const badges = promptBuilder.getBadges(...listBadges)
    addContentToTemplate(badges)
  }

  const prerequisites = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const prerequisites = promptBuilder.getPrerequisites()
    addContentToTemplate(prerequisites)
  }

  const projectSummary = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    addContentToTemplate(`## ${README_SECTIONS['project-summary']}\n\n`)
    const promptProjectSummary = await promptBuilder.getProjectSummary()
    await complete(promptProjectSummary)
  }

  const tableOfContents = ({
    promptBuilder,
    sections
  }: {
    promptBuilder: PromptBuilder
    sections: Section[]
  }) => {
    const contents = promptBuilder.getTableContents({ sections })
    addContentToTemplate(contents)
  }

  return {
    banner,
    overview,
    techStack,
    settingUp,
    runningLocally,
    acknowledgments,
    roadmap,
    changelog,
    commands,
    faq,
    projectStructure,
    license,
    deploy,
    tableContributors,
    galleryContributors,
    badges,
    prerequisites,
    projectSummary,
    tableOfContents
  }
}
