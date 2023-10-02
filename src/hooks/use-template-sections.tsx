import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { useTemplate } from '@/store'
import { BadgeName, Section } from '@/types'
import { PromptBuilder } from '@/utils/prompt-builder'
import { README_SECTIONS } from '@/constants'

export function useTemplateSections() {
  const setContentTemplate = useTemplate((state) => state.setContentTemplate)
  const { complete, setCompletion } = useCompletion({
    id: 'readme',
    onFinish: (_prompt, completion) => {
      setCompletion('')
      setContentTemplate(`${completion}\n\n`)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const banner = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const banner = promptBuilder.getBanner()
    setContentTemplate(`${banner}\n\n`)
  }

  const overview = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setContentTemplate(`# ${promptBuilder.getRepoName()}\n\n`)
    const promptOverview = await promptBuilder.getOverview()
    await complete(promptOverview)
  }

  const techStack = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setContentTemplate(`## Stack\n\n`)
    const promptTechStack = await promptBuilder.getTechStack()
    await complete(promptTechStack)
  }

  const settingUp = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const promptSettingUp = await promptBuilder.getEnvironmentVariablesGuide()
    const header = `## ${README_SECTIONS['setting-up']}\n\n`
    if (!promptSettingUp) {
      setContentTemplate(`${header}#### Your Environment Variable\n\n- Step 1\n\n- Step 2\n\n`)
      return
    }

    setContentTemplate(`${header}`)
    await complete(promptSettingUp)
  }

  const runningLocally = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const runningLocally = await promptBuilder.getRunningLocally()
    setContentTemplate(runningLocally)
  }

  const acknowledgments = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const acknowledgments = promptBuilder.getAcknowledgments()
    setContentTemplate(acknowledgments)
  }

  const roadmap = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const roadmap = promptBuilder.getRoadmap()
    setContentTemplate(roadmap)
  }

  const changelog = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const changelog = promptBuilder.getChangelog()
    setContentTemplate(changelog)
  }

  const commands = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const commands = promptBuilder.getCommands()
    setContentTemplate(commands)
  }

  const faq = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const faq = promptBuilder.getFaq()
    setContentTemplate(faq)
  }

  const projectStructure = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const projectStructure = await promptBuilder.getProjectStructure()
    setContentTemplate(projectStructure)
  }

  const license = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const license = await promptBuilder.getLicense()
    setContentTemplate(license)
  }

  const deploy = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const deploy = promptBuilder.getDeploy()
    setContentTemplate(deploy)
  }

  const tableContributors = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const table = await promptBuilder.getTableContributors({ contributorsPerRow: 7 })
    setContentTemplate(table)
  }

  const galleryContributors = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const contributors = promptBuilder.getGalleryContributors()
    setContentTemplate(contributors)
  }

  const badges = ({
    promptBuilder,
    listBadges = ['stars', 'contributors', 'top_language', 'license']
  }: {
    promptBuilder: PromptBuilder
    listBadges?: BadgeName[]
  }) => {
    const badges = promptBuilder.getBadges(...listBadges)
    setContentTemplate(badges)
  }

  const prerequisites = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const prerequisites = promptBuilder.getPrerequisites()
    setContentTemplate(prerequisites)
  }

  const projectSummary = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setContentTemplate(`## ${README_SECTIONS['project-summary']}\n\n`)
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
    setContentTemplate(contents)
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
