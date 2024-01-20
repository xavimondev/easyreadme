import { NodeName } from '@/types'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { Badge } from '@/components/editor/components/badge'

export default Node.create({
  name: NodeName.BADGE,
  group: 'inline',
  inline: true,
  atom: false,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Badge'
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      data: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertBadge:
        ({ endPos, data }: { endPos: number; data: any }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.BADGE,
              attrs: {
                data
              }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['Badge', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Badge)
  }
})
