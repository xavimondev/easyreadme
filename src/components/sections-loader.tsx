'use client'

import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { SonnerCheckIc } from '@/components/icons'

export function SectionsLoader() {
  const queue = useBuilder((store) => store.queue)

  return (
    <ul className='size-full flex flex-col gap-2 overflow-y-auto'>
      {queue.jobs.map((section) => {
        const { id, name, status } = section
        const icon =
          status === 'completed' ? (
            <SonnerCheckIc />
          ) : (
            <LoaderIcon size={18} className='animate-spin' />
          )
        return (
          <li className='flex gap-3 animate-fade-slide' key={id}>
            {icon}
            <span
              className={cn('transition-opacity duration-200', {
                'opacity-20': status == 'idle',
                'opacity-80': status == 'loading',
                'font-medium': status === 'completed'
              })}
            >
              {status === 'completed' ? 'Added' : 'Adding'} {name}...
            </span>
          </li>
        )
      })}
    </ul>
  )
}
