'use client'

import { KeyRound } from 'lucide-react'

import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AiLocally } from '@/components/ai-locally'
import { CounterInfo } from '@/components/counter-info'
import { FormApiKey } from '@/components/form-api-key'

export function GenerationInfo() {
  const { data, isLoading } = useRemaining()

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='w-full rounded-md p-[1px] focus:outline-none hidden sm:flex gap-2 items-center bg-zinc-900 border hover:bg-zinc-800 transition-colors duration-300'>
            <KeyRound size={18} className='text-purple-300' />
            <span className='text-transparent bg-clip-text bg-gradient-to-tr from-purple-500 via-purple-300 to-purple-100'>
              {isLoading ? 0 : data.remaining} / {RATE_LIMIT} generations
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[400px]'>
          <div className='flex flex-col gap-5'>
            {data && <CounterInfo remaining={data.remaining} />}
            <FormApiKey />
            <AiLocally />
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
