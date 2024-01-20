'use client'

import { NameTemplate } from '@/types'
import { Loader2, Zap } from 'lucide-react'
import { toast } from 'sonner'

import { isValidGitHubRepositoryURL } from '@/utils/github'
import { RepositoryTemplate } from '@/utils/repository-template'
import { getRepositoryData } from '@/services/github'
import { checkRateLimit } from '@/services/rate-limit'
import { useBuilder } from '@/store'
import { useRemaining } from '@/hooks/use-remaining'
import { useTemplates } from '@/hooks/use-templates'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GitIc } from '@/components/icons'

export function FormRepository() {
  const { minimal, collaborate, empower, inspire, unleash } = useTemplates()
  const isGenerating = useBuilder((state) => state.isGenerating)
  const setIsGenerating = useBuilder((state) => state.setIsGenerating)
  const templateSelected = useBuilder((state) => state.templateSelected)
  const clearContentTemplate = useBuilder((state) => state.clearContentTemplate)
  const { mutate } = useRemaining()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const urlRepository = formData.get('urlRepository') as string
    if (!isValidGitHubRepositoryURL({ url: urlRepository }) || !templateSelected) {
      toast.error('Invalid GitHub URL')
      return
    }

    setIsGenerating(true)
    const msg = await checkRateLimit()
    if (msg) {
      toast.error(msg)
      setIsGenerating(false)
      return
    }

    const data = await getRepositoryData({ urlRepository })
    if (!data) {
      toast.error('Repository not found. Enter a valid GitHub Repository URL.')
      setIsGenerating(false)
      return
    }

    const repositoryTemplate = new RepositoryTemplate(data)

    clearContentTemplate()
    mutate()

    const listTemplates: Record<NameTemplate, any> = {
      Minimal: minimal,
      Collaborate: collaborate,
      Empower: empower,
      Inspire: inspire,
      Unleash: unleash
    }
    await listTemplates[templateSelected]({ repositoryTemplate })
    setIsGenerating(false)
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
        className='flex gap-1 transition-colors border dark:border-gray-800 border-gray-400'
        disabled={isGenerating}
      >
        {!isGenerating ? (
          <>
            Generate
            <Zap className='h-4 w-4' />
          </>
        ) : (
          <>
            Generating
            <Loader2 className='animate-spin h-4 w-4' />
          </>
        )}
      </Button>
    </form>
  )
}
