'use client'

import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { FormApiKey } from '@/components/form-api-key'

export function CounterRemaining() {
  const { data, isLoading } = useRemaining()

  return (
    <>
      <HoverCard openDelay={200} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div className='relative h-auto w-full'>
            <div className='absolute top-0 flex w-full justify-center'>
              <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-purple-300 to-[rgba(17,17,17,0)] transition-all duration-1000' />
            </div>
            <div className='flex h-full items-center justify-center rounded-md border border-purple-300/20 bg-neutral-950/70 px-3 py-2'>
              <p className='text-sm text-transparent bg-clip-text bg-gradient-to-t from-purple-400 to-purple-200'>
                {isLoading ? 0 : data.remaining} / {RATE_LIMIT} generations
              </p>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className='w-96'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>
                You have{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-t from-purple-400 to-purple-200'>
                  {data?.remaining} / {RATE_LIMIT} generations
                </span>{' '}
                left. Use your API Key to keep generating AI sections.
              </p>
            </div>
            <FormApiKey />
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  )
}
