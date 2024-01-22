'use client'

import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'

export function CounterRemaining() {
  const { data, isLoading } = useRemaining()

  return (
    <div className='relative h-auto w-full overflow-hidden rounded-md border border-slate-800 p-[0.7px] backdrop-blur-3xl'>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex h-full w-full items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-3xl'>
        {isLoading ? 0 : data.remaining} / {RATE_LIMIT} templates
      </div>
    </div>
  )
}
