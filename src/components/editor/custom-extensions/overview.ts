import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Overview } from '@/components/editor/components/overview'

export default Node.create({
  name: 'overview',
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
        async ({ editor }: any) => {
          return editor.commands.insertContent({
            type: 'overview',
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
