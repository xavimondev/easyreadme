import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Feedback } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.FEEDBACK]: {
      insertFeedback: ({ endPos }: { endPos: number }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.FEEDBACK,
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      html: {
        default: ''
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'Feedback'
      }
    ]
  },
  addCommands(): any {
    return {
      insertFeedback:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.FEEDBACK
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['Feedback', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Feedback)
  }
})
