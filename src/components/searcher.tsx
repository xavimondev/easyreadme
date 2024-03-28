'use client'

import { Dispatch, SetStateAction } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

type SearcherProps = {
  setFilterSection: Dispatch<SetStateAction<string>>
}

export function Searcher({ setFilterSection }: SearcherProps) {
  return (
    <div className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full px-3.5'>
      <form>
        <div className='relative'>
          <Search className='absolute left-3.5 top-2.5 size-4 text-muted-foreground' />
          <Input
            placeholder='Search sections'
            className='pl-9'
            onChange={(e) => setFilterSection(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}
