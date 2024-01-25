import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { TableContents } from '@/components/editor/views/table-contents'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.TABLE_CONTENTS]: {
      insertTableContents: ({ endPos, content }: { endPos: number; content: any }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.TABLE_CONTENTS,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'TableContents'
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      content: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertTableContents:
        ({ endPos, content }: { endPos: number; content: any }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.TABLE_CONTENTS,
              attrs: { content }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['TableContents', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(TableContents)
  }
})