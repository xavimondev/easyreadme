'use client'

import { useEffect, useRef } from 'react'
import { getApiKey, setApiKey } from '@/actions'
import { KeyRound } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function FormApiKey() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  // TODO: Find a better way to do this, it shifts the input's value when component mounts
  useEffect(() => {
    const getCookie = async () => {
      const cookie = await getApiKey()
      console.log(cookie)
      inputRef.current!.value = cookie ?? ''
    }
    getCookie()
  }, [])

  return (
    <form className='flex flex-col gap-2 w-full' action={setApiKey}>
      <div className='flex flex-col gap-2.5 text-center sm:text-left'>
        <h2 className='text-lg font-semibold leading-none tracking-tight'>API Key</h2>
        <p className='text-sm text-muted-foreground'>
          Set your OpenAI API key. You can grab it{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-500 underline underline-offset-4 hover:text-cyan-300'
            href='https://platform.openai.com/account/api-keys'
          >
            here
          </a>
          .
        </p>
      </div>
      <div className='flex'>
        <Label
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only text-right'
          htmlFor='key'
        ></Label>
      </div>
      <div className='relative'>
        <KeyRound className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='XX-XXXXXXXXXXXXXXXX'
          id='key'
          name='key'
          className='pl-9'
          required
          ref={inputRef}
        />
      </div>
    </form>
  )
}
