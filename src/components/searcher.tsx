'use client'
import { Search } from 'lucide-react'
import { INITIAL_STATE_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { Input } from '@/components/ui/input'

export function Searcher() {
  const setSections = useBuilder((store) => store.setSections)

  return (
    <div className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full'>
      <form>
        <div className='relative'>
          <Search className='absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search sections'
            className='pl-9'
            onChange={(e) => {
              const input = e.currentTarget.value.toLocaleLowerCase()
              const data = INITIAL_STATE_SECTIONS.filter((section) =>
                section.name.toLowerCase().includes(input)
              )
              setSections(data)
            }}
          />
        </div>
      </form>
    </div>
  )
}
