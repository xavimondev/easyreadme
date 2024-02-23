import { mergeAttributes, Node, type Editor, type Range } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Alert } from '@/components/editor/views/alert'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.ALERT]: {
      insertAlert: ({ range, id }: { range: Range; id: string }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.ALERT,
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      id: {
        default: ''
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'Alert'
      }
    ]
  },
  addCommands(): any {
    return {
      insertAlert:
        ({ range, id }: { range: Range; id: string }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(range, {
              type: NodeName.ALERT,
              attrs: { id }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['Alert', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Alert)
  }
})
