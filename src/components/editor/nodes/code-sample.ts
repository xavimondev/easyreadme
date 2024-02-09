import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { CodeSample } from '@/components/editor/views/code-sample'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.CODE_SAMPLE]: {
      insertCodeSample: ({ endPos }: { endPos: number }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.CODE_SAMPLE,
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
        tag: 'CodeSample'
      }
    ]
  },
  addCommands(): any {
    return {
      insertCodeSample:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.CODE_SAMPLE
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['CodeSample', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeSample)
  }
})
