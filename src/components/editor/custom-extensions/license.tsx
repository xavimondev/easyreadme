import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
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
      license: {
        default: {}
      }
    }
  },
  addCommands(): any {
    return {
      insertLicense:
        ({ license }: { license: any }) =>
        ({ editor }: any) => {
          return editor.commands.insertContent({
            type: NodeName.LICENSE,
            attrs: { license }
          })
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
