import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { ApiReference } from '@/components/editor/views/api-reference'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.API_REFERENCE]: {
      insertApiReference: ({ endPos }: { endPos: number }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.API_REFERENCE,
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      html: {
        default: ''
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'ApiReference'
      }
    ]
  },
  addCommands(): any {
    return {
      insertApiReference:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.API_REFERENCE
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ApiReference', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ApiReference)
  }
})
