'use client'
import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'

export function CounterRemaining() {
  const { data, isLoading } = useRemaining()

  return (
    <div className='w-full flex items-center justify-center rounded-md px-6 py-1.5 border border-sky-300/20'>
      <span
        className='font-medium 
        flex 
        items-center 
        justify-center 
        w-full 
        text-sm 
        2xl:text-base 
        text-transparent 
        bg-clip-text 
        bg-gradient-to-t 
        from-sky-300 
        to-sky-600'
      >
        {isLoading ? 0 : data.remaining} / {RATE_LIMIT} templates
      </span>
    </div>
  )
}
