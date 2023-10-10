import { RepositoryTemplate } from '@/utils/repository-template'
import { useSections } from '@/hooks/use-sections'
import { useTemplate } from '@/store'

export function useTemplates() {
  const {
    banner,
    overview,
    runningLocally,
    settingUp,
    techStack,
    acknowledgments,
    roadmap,
    changelog,
    faq,
    projectStructure,
    license,
    deploy,
    galleryContributors,
    tableContributors,
    badges,
    prerequisites,
    projectSummary,
    tableOfContents
  } = useSections()
  const setIsGenerating = useTemplate((state) => state.setIsGenerating)

  const minimal = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    await overview({ repositoryTemplate })
    await settingUp({ repositoryTemplate })
    await runningLocally({ repositoryTemplate })
    deploy({ repositoryTemplate })
    await license({ repositoryTemplate })
    setIsGenerating(false)
  }

  const collaborate = async ({
    repositoryTemplate
  }: {
    repositoryTemplate: RepositoryTemplate
  }) => {
    banner({ repositoryTemplate })
    badges({
      repositoryTemplate,
      listBadges: ['contributors', 'discussions', 'issues', 'pull_requests']
    })
    tableOfContents({
      repositoryTemplate,
      sections: ['stack', 'project-summary', 'setting-up', 'run-locally', 'contributors', 'license']
    })
    await techStack({ repositoryTemplate })
    await projectSummary({ repositoryTemplate })
    await settingUp({ repositoryTemplate })
    await runningLocally({ repositoryTemplate })
    await tableContributors({ repositoryTemplate })
    await license({ repositoryTemplate })
    setIsGenerating(false)
  }

  const inspire = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    banner({ repositoryTemplate })
    badges({
      repositoryTemplate,
      listBadges: ['codesize', 'last_commit', 'commit_activity_month', 'license']
    })
    await overview({ repositoryTemplate })
    tableOfContents({
      repositoryTemplate,
      sections: [
        'project-structure',
        'project-summary',
        'stack',
        'setting-up',
        'run-locally',
        'contributors',
        'deploy',
        'license'
      ]
    })
    await projectStructure({ repositoryTemplate })
    await projectSummary({ repositoryTemplate })
    await techStack({ repositoryTemplate })
    await settingUp({ repositoryTemplate })
    await runningLocally({ repositoryTemplate })
    galleryContributors({ repositoryTemplate })
    deploy({ repositoryTemplate })
    await license({ repositoryTemplate })
    setIsGenerating(false)
  }

  const empower = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    await overview({ repositoryTemplate })
    tableOfContents({
      repositoryTemplate,
      sections: ['stack', 'setting-up', 'run-locally', 'roadmap', 'acknowledgements', 'changelog']
    })
    await techStack({ repositoryTemplate })
    await settingUp({ repositoryTemplate })
    await runningLocally({ repositoryTemplate })
    await roadmap({ repositoryTemplate })
    acknowledgments({ repositoryTemplate })
    await changelog({ repositoryTemplate })
    setIsGenerating(false)
  }

  const unleash = async ({ repositoryTemplate }: { repositoryTemplate: RepositoryTemplate }) => {
    banner({ repositoryTemplate })
    badges({
      repositoryTemplate,
      listBadges: ['top_language', 'codesize', 'stars', 'deployment']
    })
    await overview({ repositoryTemplate })
    tableOfContents({
      repositoryTemplate,
      sections: [
        'project-structure',
        'prerequisites',
        'run-locally',
        'faq',
        'roadmap',
        'acknowledgements',
        'license'
      ]
    })
    await projectStructure({ repositoryTemplate })
    prerequisites({ repositoryTemplate })
    await runningLocally({ repositoryTemplate })
    await faq({ repositoryTemplate })
    await roadmap({ repositoryTemplate })
    acknowledgments({ repositoryTemplate })
    await license({ repositoryTemplate })
    setIsGenerating(false)
  }

  return {
    minimal,
    collaborate,
    inspire,
    empower,
    unleash
  }
}
