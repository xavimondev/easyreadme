'use client'
import { useCompletion } from 'ai/react'
import { useTemplate } from '@/store'
import { PromptBuilder } from '@/utils/prompt-builder'
import { isValidGitHubRepositoryURL } from '@/utils/git-repository'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GitIc } from '@/components/icons'

export function FormRepository() {
  const setContentTemplate = useTemplate((state) => state.setContentTemplate)
  const { complete, setCompletion } = useCompletion({
    id: 'readme',
    onResponse: (res) => {
      // console.log(res)
      if (res.status === 429) {
        //toast.error('You are being rate limited. Please try again later.');
      }
    },
    onFinish: (_prompt, completion) => {
      // console.log(completion)
      setContentTemplate(`${completion}\n\n`)
    },
    onError: (err) => {
      console.error(err)
    }
  })

  const minimalTemplate = async ({ urlRepository }: { urlRepository: string }) => {
    const promptBuilder = new PromptBuilder(urlRepository)
    // const urlRepository = 'https://github.com/xavimondev/boostgrammar.io'
    const banner = promptBuilder.getBanner()
    setContentTemplate(`${banner}\n\n# ${promptBuilder.getRepoName()}\n\n`)
    const promptOverview = await promptBuilder.getOverview()
    await complete(promptOverview)
    setContentTemplate(`## Stack\n\n`)
    const promptTechStack = await promptBuilder.getTechStack()
    await complete(promptTechStack)
    setContentTemplate(`## Setting up\n\n`)
    const promptSettingUp = await promptBuilder.getEnvironmentVariablesGuide()
    await complete(promptSettingUp)
    const runningLocally = await promptBuilder.getRunningLocally()
    setCompletion(runningLocally)
    // setContentTemplate(runningLocally)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const urlRepository = formData.get('urlRepository') as string
    if (!isValidGitHubRepositoryURL({ url: urlRepository })) return
    console.log(urlRepository)
    await minimalTemplate({ urlRepository })
  }

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
      <div className='relative flex w-full items-center'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/40'>
          <GitIc className='w-4 h-4' />
        </div>
        <Input
          type='url'
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          required
          name='urlRepository'
          className='h-11 pl-9 focus-visible:border-gray-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60'
          placeholder='https://github.com/xavimondev/readme-creator'
        />
      </div>
      <Button variant='secondary' type='submit'>
        Sent
      </Button>
    </form>
  )
}
