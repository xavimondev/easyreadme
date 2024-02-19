import { Dispatch, SetStateAction, useEffect } from 'react'

import { EditorCommand } from '@/components/ui/commands/editor-command'
import { EditorCommandItem } from '@/components/ui/commands/editor-command-item'

import { suggestions } from './suggestions'

type CommandSelectorProps = {
  type: 'col' | 'row' | undefined
  coordsCommandSelector: { x: number; y: number } | undefined
  setCoordsCommandSelector: Dispatch<
    SetStateAction<
      | {
          x: number
          y: number
        }
      | undefined
    >
  >
}

export function CommandSelector({
  type,
  coordsCommandSelector,
  setCoordsCommandSelector
}: CommandSelectorProps) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const commandRef = document.querySelector('#slash-command')
      if (commandRef && commandRef.contains(event.target as Node)) return
      setCoordsCommandSelector(undefined)
    }

    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setCoordsCommandSelector(undefined)
      }
    }
    // const commandRef = document.querySelector('#slash-command')
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const { x, y } = coordsCommandSelector ?? {}
  return (
    <EditorCommand
      className='z-50 h-auto max-h-[200px] w-56 overflow-y-auto rounded-md border border-muted bg-background p-2 shadow-md transition-all absolute animate-[fade-in_.1s_ease-in-out]'
      style={{
        top: y,
        left: x
      }}
    >
      {suggestions
        .filter((i) => i.type === type)
        .map(({ title, command, icon }) => (
          <EditorCommandItem
            value={title}
            onCommand={(val) => {
              command(val)
              setCoordsCommandSelector(undefined)
            }}
            className='flex w-full items-center gap-1 py-1 rounded-md text-left text-sm hover:bg-accent/70 aria-selected:bg-accent/70 h-8'
            key={title}
          >
            <div className='flex size-6 items-center justify-center'>{icon}</div>
            <div>
              <p className='text-sm font-medium'>{title}</p>
            </div>
          </EditorCommandItem>
        ))}
    </EditorCommand>
  )
}
