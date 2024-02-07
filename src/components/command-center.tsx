'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

import { isValidGitHubRepositoryURL } from '@/utils/github'
import { useBuilder } from '@/store'
import { useReadme } from '@/hooks/use-readme'
import { FormSearch } from '@/components/form-search'

export function CommandCenter() {
  const { buildTemplate } = useReadme()
  const { setGitUrlRepository, moduleSelected, gitUrlRepository } = useBuilder()

  useEffect(() => {
    if (gitUrlRepository === '' || moduleSelected === 'custom') return

    buildTemplate({})
  }, [gitUrlRepository])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlRepositoryValue = e.currentTarget.urlRepository.value
    if (!isValidGitHubRepositoryURL({ url: urlRepositoryValue })) {
      toast.error('Invalid GitHub URL')
      return
    }

    if (gitUrlRepository !== urlRepositoryValue) {
      setGitUrlRepository(urlRepositoryValue)
    }
  }

  return <FormSearch onSubmit={onSubmit} />
}
