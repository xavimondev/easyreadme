'use client'
import { PromptBuilder } from '@/utils/prompt-builder'
import { isValidGitHubRepositoryURL } from '@/utils/git-repository'
import { useTemplates } from '@/hooks/use-templates'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GitIc } from '@/components/icons'

let promptBuilder: PromptBuilder

export function FormRepository() {
  const { minimalTemplate } = useTemplates()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const urlRepository = formData.get('urlRepository') as string
    if (!isValidGitHubRepositoryURL({ url: urlRepository })) return
    console.log(urlRepository)
    if (!promptBuilder) {
      promptBuilder = new PromptBuilder(urlRepository)
    }
    await minimalTemplate({ promptBuilder })
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
