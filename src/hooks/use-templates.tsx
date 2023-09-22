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
    commands,
    faq,
    projectStructure,
    license,
    deploy,
    galleryContributors,
    tableContributors,
    badges,
    prerequisites,
    projectSummary
  } = useTemplateSections()
  const setIsGenerating = useTemplate((state) => state.setIsGenerating)

  const minimalTemplate = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    setIsGenerating(true)
    banner({ promptBuilder })
    await overview({ promptBuilder })
    await techStack({ promptBuilder })
    await settingUp({ promptBuilder })
    await runningLocally({ promptBuilder })
    setIsGenerating(false)
  }

  return {
    minimalTemplate
  }
}
