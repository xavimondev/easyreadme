import { useCompletion } from 'ai/react'
import { useTemplate } from '@/store'
import { PromptBuilder } from '@/utils/prompt-builder'

export function useTemplateSections() {
  const setContentTemplate = useTemplate((state) => state.setContentTemplate)
  const { complete, setCompletion } = useCompletion({
    id: 'readme',
    onResponse: (res) => {
      if (res.status === 429) {
        //toast.error('You are being rate limited. Please try again later.');
      }
    },
    onFinish: (_prompt, completion) => {
      setContentTemplate(`${completion}\n\n`)
    },
    onError: (err) => {
      console.error(err)
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
    const header = `## Setting up\n\n`
    if (!promptSettingUp) {
      setContentTemplate(`${header}#### Your Environment Variable\n\n- Step 1\n\n- Step 2\n\n`)
      return
    }

    setContentTemplate(`${header}`)
    await complete(promptSettingUp)
  }

  const runningLocally = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const runningLocally = await promptBuilder.getRunningLocally()
    setCompletion(runningLocally)
    setContentTemplate(runningLocally)
  }

  const acknowledgments = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const acknowledgments = promptBuilder.getAcknowledgments()
    setCompletion(acknowledgments)
    setContentTemplate(acknowledgments)
  }

  const roadmap = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const roadmap = promptBuilder.getRoadmap()
    setCompletion(roadmap)
    setContentTemplate(roadmap)
  }

  const changelog = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const changelog = promptBuilder.getChangelog()
    setCompletion(changelog)
    setContentTemplate(changelog)
  }

  const commands = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const commands = promptBuilder.getCommands()
    setCompletion(commands)
    setContentTemplate(commands)
  }

  const faq = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const faq = promptBuilder.getFaq()
    setCompletion(faq)
    setContentTemplate(faq)
  }

  const projectStructure = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const projectStructure = await promptBuilder.getProjectStructure()
    setCompletion(projectStructure)
    setContentTemplate(projectStructure)
  }

  const license = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const license = await promptBuilder.getLicense()
    setCompletion(license)
    setTimeout(() => {
      setContentTemplate(license)
    }, 2000)
  }

  const deploy = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const deploy = promptBuilder.getDeploy()
    setCompletion(deploy)
    setContentTemplate(deploy)
  }

  const tableContributors = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const table = await promptBuilder.getTableContributors({ contributorsPerRow: 7 })
    setCompletion(table)
    setContentTemplate(table)
  }

  const galleryContributors = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const contributors = promptBuilder.getGalleryContributors()
    setCompletion(contributors)
    setContentTemplate(contributors)
  }

  const badges = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const badges = promptBuilder.getBadges()
    setCompletion(badges)
    setContentTemplate(badges)
  }

  const prerequisites = ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const prerequisites = promptBuilder.getPrerequisites()
    setCompletion(prerequisites)
    setContentTemplate(prerequisites)
  }

  const projectSummary = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setContentTemplate(`## Project summary\n\n`)
    const promptProjectSummary = await promptBuilder.getProjectSummary()
    await complete(promptProjectSummary)
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
    projectSummary
  }
}
