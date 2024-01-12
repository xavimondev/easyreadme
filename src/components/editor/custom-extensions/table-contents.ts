import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { TableContents } from '@/components/editor/components/table-contents'

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
      content: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertTableContents:
        ({ content }: { content: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent({
            type: 'tableContents',
            attrs: { content }
          })
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
