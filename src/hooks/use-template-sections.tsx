import { useCompletion } from 'ai/react'
import { useTemplate } from '@/store'
import { PromptBuilder } from '@/utils/prompt-builder'

export function useTemplateSections() {
  const setContentTemplate = useTemplate((state) => state.setContentTemplate)
  const { complete, setCompletion, isLoading } = useCompletion({
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
    setContentTemplate(`## Setting up\n\n`)
    const promptSettingUp = await promptBuilder.getEnvironmentVariablesGuide()
    await complete(promptSettingUp)
  }

  const runningLocally = async ({ promptBuilder }: { promptBuilder: PromptBuilder }) => {
    const runningLocally = await promptBuilder.getRunningLocally()
    setCompletion(runningLocally)
    // setContentTemplate(runningLocally)
  }

  return {
    banner,
    overview,
    techStack,
    settingUp,
    runningLocally,
    isLoading
  }
}
