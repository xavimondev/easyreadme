import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Badge } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.BADGE]: {
      insertBadge: ({ endPos, data }: { endPos: number; data: any }) => ReturnType
    }
  }
}

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
        default: {}
      }
    }
  },
  addCommands(): any {
    return {
      insertBadge:
        ({ endPos, data }: { endPos: number; data: any }) =>
        ({ editor }: { editor: Editor }) => {
          const pos = endPos < 0 ? this.editor.state.selection.head : endPos
          return editor
            .chain()
            .insertContentAt(pos, {
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
