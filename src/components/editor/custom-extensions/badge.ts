import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
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
      data: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertBadge:
        ({ data }: { data: any }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .focus()
            .insertContent({
              type: NodeName.BADGE,
              attrs: {
                data
              }
            })
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
