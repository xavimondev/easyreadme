import { useEffect, useState } from 'react'
import type { Range } from '@tiptap/core'
import { Command } from 'cmdk'

import { useBuilder } from '@/store'
import { Separator } from '@/components/ui/separator'

import { EditorCommandEmpty } from './editor-command-item'
import { GroupAlertsBlock } from './group-alerts'
import { GroupBasicBlock } from './group-basic'

export const EditorCommandOut = ({
  query,
  range
}: {
  query: string
  range: Range
}): JSX.Element => {
  const [search, setSearch] = useState(query)
  const setRange = useBuilder((store) => store.setRange)

  useEffect(() => {
    setSearch(query)
  }, [query])

  useEffect(() => {
    setRange(range)
  }, [range, setRange])

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        const commandRef = document.querySelector('#readme-command')

        if (commandRef)
          commandRef.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: e.key,
              cancelable: true,
              bubbles: true
            })
          )

        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <Command
      onKeyDown={(e) => {
        e.stopPropagation()
      }}
      id='readme-command'
      className='readme-command z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md animate-[fade-in_.2s_ease-in]'
    >
      <Command.Input value={search} onValueChange={setSearch} style={{ display: 'none' }} />
      <Command.List>
        <EditorCommandEmpty className='px-2 text-muted-foreground text-sm'>
          No results
        </EditorCommandEmpty>
        <GroupBasicBlock />
        <Separator className='my-2' />
        <GroupAlertsBlock />
      </Command.List>
    </Command>
  )
}
