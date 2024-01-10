import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Badge } from '@/components/editor/components/badge'

export default Node.create({
  name: 'badges',
  group: 'inline',
  inline: true,
  atom: false,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Badges'
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
              type: 'badges',
              attrs: {
                data
              }
            })
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['Badges', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Badge)
  }
})
