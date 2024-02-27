import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { type Editor, type Range } from '@tiptap/core'

import { useBuilder } from '@/store'
import { CommandItem } from '@/components/ui/command'

interface EditorCommandSlashItemProps {
  onCommand: ({ editor, range }: { editor: Editor; range: Range }) => void
}

export const CommandSlashItem = forwardRef<
  HTMLDivElement,
  EditorCommandSlashItemProps & ComponentPropsWithoutRef<typeof CommandItem>
>(({ children, onCommand, ...rest }, ref) => {
  const { readmeEditor, range } = useBuilder((store) => store)

  if (!readmeEditor || !range) return null

  return (
    <CommandItem ref={ref} {...rest} onSelect={() => onCommand({ editor: readmeEditor, range })}>
      {children}
    </CommandItem>
  )
})

CommandSlashItem.displayName = 'CommandSlashItem'
