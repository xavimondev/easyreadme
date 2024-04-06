'use client'

import { Input } from '@/components/ui/input'
import { GitIc } from '@/components/icons'

type FormSearchProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function FormSearch({ onSubmit }: FormSearchProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e)
  }

  return (
    <div className='flex flex-col relative z-10 group px-0 lg:px-3.5 mb-3 w-full'>
      <form className='flex gap-2 w-full' onSubmit={handleSubmit}>
        <div className='relative flex w-full border group-focus-within:border-neutral-600 rounded-md bg-neutral-800/60 focus-within:bg-transparent transition-colors duration-200'>
          <div className='flex pointer-events-none absolute top-2 left-2 text-black/50 dark:text-white/40'>
            <GitIc className='size-4 bg-transparent' />
          </div>
          <Input
            type='url'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            required
            name='urlRepository'
            className='w-full h-8 pl-7 border-none focus-visible:outline-none focus-visible:ring-0 group-focus-within:placeholder:text-white/60 placeholder:text-white/40'
            placeholder='https://github.com/xavimondev/easyreadme'
          />
        </div>
      </form>
    </div>
  )
}
