import { PromptBuilder } from '@/utils/prompt-builder'
import { useTemplateSections } from '@/hooks/use-template-sections'

export function useTemplates() {
  const { banner, overview, runningLocally, settingUp, techStack, isLoading } =
    useTemplateSections()

  const minimalTemplate = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    // const urlRepository = 'https://github.com/xavimondev/boostgrammar.io'
    banner({ promptBuilder })
    await overview({ promptBuilder })
    await techStack({ promptBuilder })
    await settingUp({ promptBuilder })
    await runningLocally({ promptBuilder })
  }

  return {
    minimalTemplate,
    isLoading
  }
}
