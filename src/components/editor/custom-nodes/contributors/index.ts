import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Contributors } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.CONTRIBUTORS]: {
      insertContributors: ({ endPos, data }: { endPos: number; data?: any }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.CONTRIBUTORS,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'ContributorsNode'
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      data: {
        default: {}
      },
      html: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertContributors:
        ({ endPos, data }: { endPos: number; data: any }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.CONTRIBUTORS,
              attrs: { data }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ContributorsNode', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Contributors)
  }
})
