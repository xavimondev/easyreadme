import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { License } from '@/components/editor/components/license'

export default Node.create({
  name: 'license',
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
      url: {
        default: undefined
      },
      name: {
        default: undefined
      }
    }
  },
  addCommands(): any {
    return {
      insertLicense:
        ({ license }: { license: any }) =>
        ({ editor }: any) => {
          return editor.commands.insertContent(
            `<License url="${license?.url}" name="${license?.name}"></License>`
          )
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
