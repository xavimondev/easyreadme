import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type Editor } from '@tiptap/core'

import { useBuilder } from '@/store'

type EditorBubbleItemProps = {
  children: ReactNode
  asChild?: boolean
  onSelect?: (editor: Editor) => void
}

export const EditorBubbleItem = forwardRef<
  HTMLDivElement,
  EditorBubbleItemProps & Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'>
>(function EditorBubbleItem({ children, asChild, onSelect, ...rest }, ref) {
  const readmeEditor = useBuilder((state) => state.readmeEditor)
  const Comp = asChild ? Slot : 'div'

  if (!readmeEditor) return null

  return (
    <Comp ref={ref} {...rest} onClick={() => onSelect?.(readmeEditor)}>
      {children}
    </Comp>
  )
})
