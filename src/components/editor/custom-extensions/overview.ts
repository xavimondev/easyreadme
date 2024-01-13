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
      endPos: {
        default: 0
      },
      content: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertOverview:
        ({ endPos, content }: { endPos: number; content: string }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.OVERVIEW,
              attrs: { content }
            })
            .focus('end')
            .run()
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
