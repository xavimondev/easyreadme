import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { type Editor, type Range } from '@tiptap/core'
import { CommandEmpty, CommandItem } from 'cmdk'

import { useBuilder } from '@/store'

interface EditorCommandItemProps {
  onCommand: ({ editor }: { editor: Editor }) => void
}

export const EditorCommandItem = forwardRef<
  HTMLDivElement,
  EditorCommandItemProps & ComponentPropsWithoutRef<typeof CommandItem>
>(function EditorCommandItem({ children, onCommand, ...rest }, ref) {
  const readmeEditor = useBuilder((store) => store.readmeEditor)

  if (!readmeEditor) return null

  return (
    <CommandItem ref={ref} {...rest} onSelect={() => onCommand({ editor: readmeEditor })}>
      {children}
    </CommandItem>
  )
})

export const EditorCommandEmpty = CommandEmpty

interface EditorCommandItemMagicProps {
  onCommand: ({ editor, range }: { editor: Editor; range: Range }) => void
}
export const EditorCommandItemMagic = forwardRef<
  HTMLDivElement,
  EditorCommandItemMagicProps & ComponentPropsWithoutRef<typeof CommandItem>
>(({ children, onCommand, ...rest }, ref) => {
  const { readmeEditor, range } = useBuilder((store) => store)

  if (!readmeEditor || !range) return null

  return (
    <CommandItem ref={ref} {...rest} onSelect={() => onCommand({ editor: readmeEditor, range })}>
      {children}
    </CommandItem>
  )
})

EditorCommandItemMagic.displayName = 'EditorCommandItemMagic'
