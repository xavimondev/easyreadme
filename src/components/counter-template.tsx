'use client'
import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'
import { LoadingIc } from '@/components/icons'

export function CounterTemplate() {
  const { data, isLoading } = useRemaining()

  return (
    <div className='flex rounded-md bg-sky-400/40 dark:bg-sky-700/40 px-3 py-1'>
      <p className='text-sm text-sky-900 dark:text-sky-500 font-semibold flex items-center'>
        {isLoading ? <LoadingIc className='w-3 h-3 mr-2 animate-twSpin' /> : `${data.remaining}`}
        {` / ${RATE_LIMIT} templates`}
      </p>
    </div>
  )
}
