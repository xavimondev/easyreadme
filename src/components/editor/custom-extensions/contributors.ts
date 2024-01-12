import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { Contributors } from '@/components/editor/components/contributors'

export default Node.create({
  name: NodeName.CONTRIBUTORS,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'ContributorsNode'
      }
    ]
  },
  addAttributes() {
    return {
      type: {
        default: ''
      },
      data: {
        default: {}
      }
    }
  },
  addCommands(): any {
    return {
      insertContributors:
        ({ type, data }: { type: string; data: any }) =>
        ({ editor }: any) => {
          return editor.commands.insertContent({
            type: NodeName.CONTRIBUTORS,
            attrs: { type, data }
          })
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ContributorsNode', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Contributors)
  }
})
