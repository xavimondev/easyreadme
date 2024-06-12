'use client'

import { useEffect, useRef } from 'react'
import { getApiKey, setApiKey } from '@/actions'
import { KeyRound } from 'lucide-react'

import { useBuilder } from '@/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ListAIProvider } from '@/components/list-ai-provider'

export function FormApiKey() {
  const providerAISelected = useBuilder((store) => store.providerAISelected)

  const inputRef = useRef<HTMLInputElement | null>(null)
  // TODO: Find a better way to do this, it shifts the input's value when component mounts
  useEffect(() => {
    const getCookie = async () => {
      const cookie = await getApiKey()
      inputRef.current!.value = cookie ?? ''
    }
    getCookie()
  }, [])

  return (
    <form className='flex flex-col gap-2 w-full' action={setApiKey}>
      <div className='flex flex-col gap-2.5 text-center sm:text-left'>
        <h2 className='text-lg font-semibold leading-none tracking-tight'>API Key</h2>
        <p className='text-muted-foreground'>Choose an AI provider</p>
        <ListAIProvider />
        <p className='text-sm text-muted-foreground'>
          Enter your {providerAISelected} key. You can grab it{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-500 underline underline-offset-4 hover:text-cyan-300'
            href={
              providerAISelected === 'Mistral'
                ? 'https://console.mistral.ai/api-keys/'
                : 'https://platform.openai.com/account/api-keys'
            }
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
        <KeyRound className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
        <Input
          placeholder={
            providerAISelected === 'Mistral' ? 'XXXXXXXXXXXXXXXX' : 'XX-XXXXXXXXXXXXXXXX'
          }
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
