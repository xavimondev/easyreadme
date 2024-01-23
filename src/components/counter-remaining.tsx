'use client'

import { KeyRound } from 'lucide-react'

import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

export function CounterRemaining() {
  const { data, isLoading } = useRemaining()

  return (
    <>
      <HoverCard openDelay={200} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div className='relative h-auto w-full overflow-hidden rounded-md border border-slate-800 p-[1px] backdrop-blur-3xl'>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
            <div className='inline-flex h-full w-full items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-3xl'>
              {isLoading ? 0 : data.remaining} / {RATE_LIMIT} templates
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className='w-96'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>
                You have{' '}
                <span className='text-cyan-400 font-medium'>
                  {data?.remaining} / {RATE_LIMIT} generations
                </span>{' '}
                left. Use your API Key to keep generating AI sections.
              </p>
            </div>
            <form className='flex flex-col gap-2 w-full'>
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
                <Input placeholder='XX-XXXXXXXXXXXXXXXX' id='key' name='key' className='pl-9' />
              </div>
            </form>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  )
}
