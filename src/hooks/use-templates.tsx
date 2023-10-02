import { PromptBuilder } from '@/utils/prompt-builder'
import { useTemplateSections } from '@/hooks/use-template-sections'
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
  } = useTemplateSections()
  const setIsGenerating = useTemplate((state) => state.setIsGenerating)

  const minimal = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setIsGenerating(true)
    await overview({ promptBuilder })
    await settingUp({ promptBuilder })
    await runningLocally({ promptBuilder })
    deploy({ promptBuilder })
    await license({ promptBuilder })
    setIsGenerating(false)
  }

  const collaborate = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setIsGenerating(true)
    banner({ promptBuilder })
    badges({
      promptBuilder,
      listBadges: ['contributors', 'discussions', 'issues', 'pull_requests']
    })
    tableOfContents({
      promptBuilder,
      sections: ['stack', 'project-summary', 'setting-up', 'run-locally', 'contributors', 'license']
    })
    await techStack({ promptBuilder })
    await projectSummary({ promptBuilder })
    await settingUp({ promptBuilder })
    await runningLocally({ promptBuilder })
    await tableContributors({ promptBuilder })
    await license({ promptBuilder })
    setIsGenerating(false)
  }

  const inspire = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setIsGenerating(true)
    banner({ promptBuilder })
    badges({
      promptBuilder,
      listBadges: ['codesize', 'last_commit', 'commit_activity_month', 'license']
    })
    await overview({ promptBuilder })
    tableOfContents({
      promptBuilder,
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
    await projectStructure({ promptBuilder })
    await projectSummary({ promptBuilder })
    await techStack({ promptBuilder })
    await settingUp({ promptBuilder })
    await runningLocally({ promptBuilder })
    galleryContributors({ promptBuilder })
    deploy({ promptBuilder })
    await license({ promptBuilder })
    setIsGenerating(false)
  }

  const empower = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setIsGenerating(true)
    await overview({ promptBuilder })
    tableOfContents({
      promptBuilder,
      sections: ['stack', 'setting-up', 'run-locally', 'roadmap', 'acknowledgements', 'changelog']
    })
    await techStack({ promptBuilder })
    await settingUp({ promptBuilder })
    await runningLocally({ promptBuilder })
    await roadmap({ promptBuilder })
    acknowledgments({ promptBuilder })
    await changelog({ promptBuilder })
    setIsGenerating(false)
  }

  const unleash = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setIsGenerating(true)
    banner({ promptBuilder })
    badges({
      promptBuilder,
      listBadges: ['top_language', 'codesize', 'stars', 'deployment']
    })
    await overview({ promptBuilder })
    tableOfContents({
      promptBuilder,
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
    await projectStructure({ promptBuilder })
    prerequisites({ promptBuilder })
    await runningLocally({ promptBuilder })
    await faq({ promptBuilder })
    await roadmap({ promptBuilder })
    acknowledgments({ promptBuilder })
    await license({ promptBuilder })
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
