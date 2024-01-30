'use client'

import { useEffect, useRef, useState } from 'react'
import { Command } from 'lucide-react'
import { toast } from 'sonner'

import { isValidGitHubRepositoryURL } from '@/utils/github'
import { getRepositoryData } from '@/services/github'
import { checkRateLimit } from '@/services/rate-limit'
import { useBuilder } from '@/store'
import { useRemaining } from '@/hooks/use-remaining'
import { Input } from '@/components/ui/input'
import { GitIc } from '@/components/icons'

export function FormRepository() {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const templateSelected = useBuilder((state) => state.templateSelected)
  const { mutate } = useRemaining()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const urlRepository = formData.get('urlRepository') as string
    if (!isValidGitHubRepositoryURL({ url: urlRepository }) || !templateSelected) {
      toast.error('Invalid GitHub URL')
      return
    }

    const msg = await checkRateLimit()
    if (msg) {
      toast.error(msg)
      return
    }

    const data = await getRepositoryData({ urlRepository })
    if (!data) {
      toast.error('Repository not found. Enter a valid GitHub Repository URL.')
      return
    }

    mutate()
  }

  return (
    <div className='flex flex-col z-10 group'>
      <form className='flex gap-2' onSubmit={handleSubmit}>
        <div className='relative flex w-[500px] items-center border group-focus-within:border-neutral-600 rounded-md group-focus-within:rounded-b-none bg-neutral-800/60 focus-within:bg-transparent transition-colors duration-200'>
          <div className='flex items-center pointer-events-none absolute inset-y-0 group-focus-within:left-0 left-[90px] pl-0 group-focus-within:pl-3 text-black/50 dark:text-white/40'>
            <GitIc className='w-4 h-4' />
          </div>
          <Input
            type='url'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            required
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            name='urlRepository'
            value={inputValue}
            className='w-full pl-9 border-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-center text-center group-focus-within:placeholder:text-left group-focus-within:text-left group-focus-within:placeholder:text-white/60 placeholder:text-white/40'
            placeholder='https://github.com/xavimondev/easyreadme'
          />
          {/* {inputValue.length > 0 ? (
            <span
              className='group-focus-within:flex items-center absolute inset-y-0 right-0 pr-2 hidden text-black/50 dark:text-white/40 focus:outline-none focus:ring-1 focus:ring-neutral-500'
              onClick={() => setInputValue('')}
            >
              <X className='w-4 h-4' />
            </span>
          ) : null} */}
          <div className='flex gap-1 items-center pointer-events-none absolute inset-y-0 right-0 pr-2 group-focus-within:hidden text-black/50 dark:text-white/40'>
            <Command className='w-4 h-4' />
            <span>K</span>
          </div>
        </div>
      </form>
      <div className='z-10 w-full border border-t-0 group-focus-within:border-neutral-600 group-focus-within:rounded-b-md bg-black/10 shadow-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-100'>
        <ul className='py-1 text-white/50 text-sm'>
          <li className='px-4 py-2 hover:bg-neutral-800 hover:text-white/80'>Previous Search 1</li>
          <li className='px-4 py-2 hover:bg-neutral-800 hover:text-white/80'>Previous Search 2</li>
          <li className='px-4 py-2 hover:bg-neutral-800 hover:text-white/80'>Previous Search 3</li>
        </ul>
      </div>
    </div>
  )
}
