'use client'

import { toast } from 'sonner'

import { isValidGitHubRepositoryURL } from '@/utils/github'
import { useReadme } from '@/hooks/use-readme'
import { FormSearch } from '@/components/form-search'

export function CommandCenter() {
  const { buildTemplate } = useReadme()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlRepository = e.currentTarget.urlRepository.value
    if (!isValidGitHubRepositoryURL({ url: urlRepository })) {
      toast.error('Invalid GitHub URL')
      return
    }

    // console.log(urlRepository)
    buildTemplate({
      url: urlRepository
    })
  }

  return <FormSearch onSubmit={onSubmit} />
}
