import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { type Editor } from '@tiptap/core'

import { useBuilder } from '@/store'
import { CommandEmpty, CommandItem } from '@/components/ui/command'

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
