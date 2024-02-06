import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { ContributorOption, NodeName } from '@/types/builder'

import { Contributors } from '@/components/editor/views/contributors'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.CONTRIBUTORS]: {
      insertContributors: ({
        endPos,
        type,
        data
      }: {
        endPos: number
        type?: string | ContributorOption
        data?: any
      }) => ReturnType
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
      type: {
        default: ''
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
        ({ endPos, type, data }: { endPos: number; type: string | ContributorOption; data: any }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.CONTRIBUTORS,
              attrs: { type, data }
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
