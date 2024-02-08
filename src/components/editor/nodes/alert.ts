import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Alert } from '@/components/editor/views/alert'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.ALERT]: {
      insertAlert: ({ endPos, id }: { endPos: number; id: string }) => ReturnType
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
      },
      html: {
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
        ({ endPos, id }: { endPos: number; id: string }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
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
