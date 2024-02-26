import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { License } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.LICENSE]: {
      insertLicense: ({ endPos, license }: { endPos: number; license: any }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.LICENSE,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'License'
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      license: {
        default: {}
      },
      html: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertLicense:
        ({ endPos, license }: { endPos: number; license: any }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.LICENSE,
              attrs: { license }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['License', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(License)
  }
})
