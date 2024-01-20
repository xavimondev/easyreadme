import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { License } from '@/components/editor/components/license'

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
      }
    }
  },
  addCommands(): any {
    return {
      insertLicense:
        ({ endPos, license }: { endPos: number; license: any }) =>
        ({ editor }: any) => {
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
