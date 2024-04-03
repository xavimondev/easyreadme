import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { BubbleMenu, isTextSelection, type BubbleMenuProps } from '@tiptap/react'
import type { Instance, Props } from 'tippy.js'

import { useBuilder } from '@/store'

export interface EditorBubbleProps extends Omit<BubbleMenuProps, 'editor'> {
  children: ReactNode
}

export function EditorBubble({ children, tippyOptions, ...rest }: EditorBubbleProps) {
  const readmeEditor = useBuilder((state) => state.readmeEditor)
  const instanceRef = useRef<Instance<Props> | null>(null)

  useEffect(() => {
    if (!instanceRef.current || !tippyOptions?.placement) return

    instanceRef.current.setProps({ placement: tippyOptions.placement })
    instanceRef.current.popperInstance?.update()
  }, [tippyOptions?.placement])

  const bubbleMenuProps: Omit<BubbleMenuProps, 'children'> = useMemo(() => {
    const shouldShow: BubbleMenuProps['shouldShow'] = ({ editor, state, view, from, to }) => {
      const { selection } = state
      const { empty } = selection
      const hasFocus = view.hasFocus()
      const isEmptyTextBlock =
        !state.doc.textBetween(from, to).length && isTextSelection(state.selection)
      // console.log('isFeedback', isNodeActive(state, 'custom-feedback'))

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selections node is a block code
      if (
        !hasFocus ||
        empty ||
        isEmptyTextBlock ||
        editor.isActive('image') ||
        editor.isActive('codeBlock')
      ) {
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
    <BubbleMenu editor={readmeEditor} {...bubbleMenuProps}>
      {children}
    </BubbleMenu>
  )
}
