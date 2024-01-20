import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

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
      endPos: {
        default: 0
      },
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
        ({ endPos, type, data }: { endPos: number; type: string; data: any }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.CONTRIBUTORS,
              attrs: { type, data }
            })
            .focus('end')
            .run()
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
