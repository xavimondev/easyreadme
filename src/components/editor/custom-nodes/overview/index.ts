import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Overview } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.OVERVIEW]: {
      insertOverview: ({ endPos, content }: { endPos: number; content?: string }) => ReturnType
    }
  }
}

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
      },
      html: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertOverview:
        ({ endPos, content }: { endPos: number; content: string }) =>
        ({ editor }: { editor: Editor }) => {
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
