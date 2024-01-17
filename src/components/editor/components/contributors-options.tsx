'use client'
import { useState } from 'react'
import { NodeName } from '@/types'
import { cn } from '@/lib/utils'

type ContributorsOptionsProps = {
  addSection: ({ section, options }: { section: NodeName; options?: { data: any } }) => void
}

export function ContributorsOptions({ addSection }: ContributorsOptionsProps) {
  const [optionSelected, setOptionSelected] = useState('')
  return (
    <div className='flex gap-10 mt-2'>
      <div
        className={cn('flex flex-col gap-2 border border-white/20 rounded-md p-3 cursor-pointer', {
          'border-yellow-300': optionSelected === 'gallery'
        })}
        onClick={() => {
          setOptionSelected('gallery')
          addSection({
            section: NodeName.CONTRIBUTORS,
            options: {
              data: 'gallery'
            }
          })
        }}
      >
        <div className='flex gap-1'>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
        </div>
        <span className='text-sm font-medium text-gray-100 dark:text-gray-400 text-center'>
          Gallery
        </span>
      </div>
      <div
        className={cn('flex flex-col gap-2 border border-white/20 rounded-md p-3 cursor-pointer', {
          'border-yellow-300': optionSelected === 'table'
        })}
        onClick={() => {
          setOptionSelected('table')
          addSection({
            section: NodeName.CONTRIBUTORS,
            options: {
              data: 'table'
            }
          })
        }}
      >
        <div className='flex gap-1'>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
        </div>
        <span className='text-sm font-medium text-gray-100 dark:text-gray-400 text-center'>
          Table
        </span>
      </div>
    </div>
  )
}
