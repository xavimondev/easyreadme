import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { TableContents } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.TABLE_CONTENTS]: {
      insertTableContents: ({ endPos }: { endPos: number }) => ReturnType
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
      html: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertTableContents:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.TABLE_CONTENTS
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
