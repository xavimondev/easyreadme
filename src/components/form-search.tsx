'use client'

import { useEffect, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { CommandK } from '@/components/command-k'
import { GitIc } from '@/components/icons'

type FormSearchProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function FormSearch({ onSubmit }: FormSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    onSubmit(e)
  }

  return (
    <div className='flex flex-col relative z-10 group'>
      <form className='flex gap-2' onSubmit={handleSubmit}>
        <div className='relative flex w-[500px] items-center border group-focus-within:border-neutral-600 rounded-md bg-neutral-800/60 focus-within:bg-transparent transition-colors duration-200'>
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
            name='urlRepository'
            className='w-full h-8 pl-9 border-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-center text-center group-focus-within:placeholder:text-left group-focus-within:text-left group-focus-within:placeholder:text-white/60 placeholder:text-white/40'
            placeholder='https://github.com/xavimondev/easyreadme'
          />
          <CommandK />
        </div>
      </form>
    </div>
  )
}
