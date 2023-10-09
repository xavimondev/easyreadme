import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { useTemplate } from '@/store'
import { BadgeName, Section } from '@/types'
import { RepositoryTemplate } from '@/utils/repository-template'
import { README_SECTIONS } from '@/constants'

export function useSections() {
  const addContentToTemplate = useTemplate((state) => state.addContentToTemplate)
  const { complete, setCompletion } = useCompletion({
    id: 'readme',
    onFinish: (_prompt, completion) => {
      setCompletion('')
      addContentToTemplate(`${completion}\n\n`)
    },
    onError: (err) => {
      const error = JSON.parse(err.message)
      toast.error(error.message)
    }
  })

  const banner = ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const banner = repositoryTemplate.getBanner()
    addContentToTemplate(`${banner}\n\n`)
  }

  const overview = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    addContentToTemplate(`# ${repositoryTemplate.getRepoName()}\n\n`)
    const promptOverview = await repositoryTemplate.getOverview()
    await complete(promptOverview)
  }

  const techStack = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    addContentToTemplate(`## Stack\n\n`)
    const promptTechStack = await repositoryTemplate.getTechStack()
    await complete(promptTechStack)
  }

  const settingUp = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const promptSettingUp = await repositoryTemplate.getEnvironmentVariablesGuide()
    const header = `## ${README_SECTIONS['setting-up']}\n\n`
    if (!promptSettingUp) {
      addContentToTemplate(`${header}#### Your Environment Variable\n\n- Step 1\n\n- Step 2\n\n`)
      return
    }

    addContentToTemplate(`${header}`)
    await complete(promptSettingUp)
  }

  const runningLocally = async ({
    repositoryTemplate
  }: {
    repositoryTemplate: RepositoryTemplate
  }) => {
    const runningLocally = await repositoryTemplate.getRunningLocally()
    addContentToTemplate(runningLocally)
  }

  const acknowledgments = ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const acknowledgments = repositoryTemplate.getAcknowledgments()
    addContentToTemplate(acknowledgments)
  }

  const roadmap = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const roadmap = repositoryTemplate.getRoadmap()
    addContentToTemplate(roadmap)
  }

  const changelog = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const changelog = repositoryTemplate.getChangelog()
    addContentToTemplate(changelog)
  }

  const commands = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const commands = repositoryTemplate.getCommands()
    addContentToTemplate(commands)
  }

  const faq = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const faq = repositoryTemplate.getFaq()
    addContentToTemplate(faq)
  }

  const projectStructure = async ({
    repositoryTemplate
  }: {
    repositoryTemplate: RepositoryTemplate
  }) => {
    const projectStructure = await repositoryTemplate.getProjectStructure()
    addContentToTemplate(projectStructure)
  }

  const license = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const license = await repositoryTemplate.getLicense()
    addContentToTemplate(license)
  }

  const deploy = ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const deploy = repositoryTemplate.getDeploy()
    addContentToTemplate(deploy)
  }

  const tableContributors = async ({
    repositoryTemplate
  }: {
    repositoryTemplate: RepositoryTemplate
  }) => {
    const table = await repositoryTemplate.getTableContributors({ contributorsPerRow: 7 })
    addContentToTemplate(table)
  }

  const galleryContributors = ({
    repositoryTemplate
  }: {
    repositoryTemplate: RepositoryTemplate
  }) => {
    const contributors = repositoryTemplate.getGalleryContributors()
    addContentToTemplate(contributors)
  }

  const badges = ({
    repositoryTemplate,
    listBadges = ['stars', 'contributors', 'top_language', 'license']
  }: {
    repositoryTemplate: RepositoryTemplate
    listBadges?: BadgeName[]
  }) => {
    const badges = repositoryTemplate.getBadges(...listBadges)
    addContentToTemplate(badges)
  }

  const prerequisites = ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    const prerequisites = repositoryTemplate.getPrerequisites()
    addContentToTemplate(prerequisites)
  }

  const projectSummary = async ({
    repositoryTemplate
  }: {
    repositoryTemplate: RepositoryTemplate
  }) => {
    addContentToTemplate(`## ${README_SECTIONS['project-summary']}\n\n`)
    const promptProjectSummary = await repositoryTemplate.getProjectSummary()
    await complete(promptProjectSummary)
  }

  const tableOfContents = ({
    repositoryTemplate,
    sections
  }: {
    repositoryTemplate: RepositoryTemplate
    sections: Section[]
  }) => {
    const contents = repositoryTemplate.getTableContents({ sections })
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
