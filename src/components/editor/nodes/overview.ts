import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { NODE_DEFAULT_VALUES } from '@/constants'
import { Overview } from '@/components/editor/views/overview'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.OVERVIEW]: {
      insertOverview: ({
        endPos,
        content,
        showPlaceholder
      }: {
        endPos: number
        content?: string
        showPlaceholder: boolean
      }) => ReturnType
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
      ...NODE_DEFAULT_VALUES,
      content: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertOverview:
        ({
          endPos,
          content,
          showPlaceholder
        }: {
          endPos: number
          content: string
          showPlaceholder: boolean
        }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.OVERVIEW,
              attrs: { content, showPlaceholder }
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
