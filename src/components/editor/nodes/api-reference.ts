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

const table = `<table><tbody><tr><th>Name</th><th>Type</th><th>Optional</th><th>Description</th></tr><tr><td>term</td><td>string</td><td>required</td><td>Search term.</td></tr><tr><td>limit</td><td>number</td><td>optional</td><td>Number of results to return.</td></tr></tbody></table>
`

export default Node.create({
  name: NodeName.API_REFERENCE,
  group: 'block',
  atom: true,
  content: '(heading|table?)+',
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
            .insertContentAt(endPos, `<ApiReference>${table}</ApiReference>`)
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
