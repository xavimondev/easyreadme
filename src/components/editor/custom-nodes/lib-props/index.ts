import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { LibProps } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.LIB_PROPS]: {
      insertLibProps: ({ endPos }: { endPos: number }) => ReturnType
    }
  }
}

const table = `<table><tbody><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr><tr><td>width</td><td>number / string</td><td>360</td><td>Width of the component, e.g. 600 or '100vw' or 'inherit'.</td></tr><tr><td>height</td><td>number / string</td><td>640</td><td>Height of the component, e.g. 1000 or '100%' or 'inherit'.</td></tr></tbody></table>
`

export default Node.create({
  name: NodeName.LIB_PROPS,
  group: 'block',
  atom: true,
  content: '(heading|table?)+',
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'LibProps'
      }
    ]
  },
  addCommands(): any {
    return {
      insertLibProps:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, `<LibProps>${table}</LibProps>`)
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['LibProps', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(LibProps)
  }
})
