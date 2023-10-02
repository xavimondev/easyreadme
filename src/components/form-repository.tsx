'use client'
import { toast } from 'sonner'
import { NameTemplate } from '@/types'
import { PromptBuilder } from '@/utils/prompt-builder'
import { isValidGitHubRepositoryURL } from '@/utils/git-repository'
import { checkRateLimit } from '@/services/rate-limit'
import { useTemplate } from '@/store'
import { useTemplates } from '@/hooks/use-templates'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GitIc, LightningIc, LoadingIc } from '@/components/icons'

let promptBuilder: PromptBuilder

export function FormRepository() {
  const { minimal, collaborate, empower, inspire, unleash } = useTemplates()
  const isGenerating = useTemplate((state) => state.isGenerating)
  const templateSelected = useTemplate((state) => state.templateSelected)
  const clearContentTemplate = useTemplate((state) => state.clearContentTemplate)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const urlRepository = formData.get('urlRepository') as string
    if (!isValidGitHubRepositoryURL({ url: urlRepository }) || !templateSelected) return

    const msg = await checkRateLimit()
    if (msg) {
      toast.error(msg)
      return
    }

    if (!promptBuilder) {
      promptBuilder = new PromptBuilder(urlRepository)
    }

    clearContentTemplate()

    const listTemplates: Record<NameTemplate, any> = {
      Minimal: minimal,
      Collaborate: collaborate,
      Empower: empower,
      Inspire: inspire,
      Unleash: unleash
    }
    await listTemplates[templateSelected]({ promptBuilder })
  }

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
      <div className='relative flex w-full items-center'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-black/50 dark:text-white/40'>
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
      <Button
        variant='secondary'
        type='submit'
        className='flex gap-1 transition-colors'
        disabled={isGenerating}
      >
        {!isGenerating ? (
          <>
            Generate
            <LightningIc className='h-4 w-4' />
          </>
        ) : (
          <>
            Generating
            <LoadingIc className='animate-spin h-4 w-4' />
          </>
        )}
      </Button>
    </form>
  )
}
