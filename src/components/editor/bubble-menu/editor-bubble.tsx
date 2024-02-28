import { forwardRef, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { BubbleMenu, type BubbleMenuProps } from '@tiptap/react'
import type { Instance, Props } from 'tippy.js'

import { useBuilder } from '@/store'

export interface EditorBubbleProps extends Omit<BubbleMenuProps, 'editor'> {
  children: ReactNode
}

export const EditorBubble = forwardRef<HTMLDivElement, EditorBubbleProps>(function EditorBubble(
  { children, tippyOptions, ...rest },
  ref
) {
  const { readmeEditor } = useBuilder()
  const instanceRef = useRef<Instance<Props> | null>(null)

  useEffect(() => {
    if (!instanceRef.current || !tippyOptions?.placement) return

    instanceRef.current.setProps({ placement: tippyOptions.placement })
    instanceRef.current.popperInstance?.update()
  }, [tippyOptions?.placement])

  const bubbleMenuProps: Omit<BubbleMenuProps, 'children'> = useMemo(() => {
    const shouldShow: BubbleMenuProps['shouldShow'] = ({ editor, state }) => {
      const { selection } = state
      const { empty } = selection

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive('image') || empty) {
        return false
      }
      return true
    }

    return {
      shouldShow,
      tippyOptions: {
        onCreate: (val) => {
          instanceRef.current = val
        },
        moveTransition: 'transform 0.15s ease-out',
        ...tippyOptions
      },
      ...rest
    }
  }, [rest, tippyOptions])

  if (!readmeEditor) return null

  return (
    <div ref={ref}>
      <BubbleMenu editor={readmeEditor} {...bubbleMenuProps}>
        {children}
      </BubbleMenu>
    </div>
  )
})
