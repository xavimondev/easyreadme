import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { Overview } from '@/components/editor/components/overview'

export default Node.create({
  name: NodeName.OVERVIEW,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Overview'
      }
    ]
  },
  addAttributes() {
    return {
      content: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertOverview:
        ({ content }: { content: string }) =>
        ({ editor }: any) => {
          return editor.commands.insertContent({
            type: NodeName.OVERVIEW,
            attrs: { content }
          })
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['Overview', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Overview)
  }
})
