import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { RunLocally } from '@/components/editor/components/run-locally'

export default Node.create({
  name: 'runlocally',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'RunLocally'
      }
    ]
  },
  addAttributes() {
    return {
      mainLanguage: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      inserRunLocally:
        ({ mainLanguage }: { mainLanguage: string | undefined }) =>
        ({ editor }: any) => {
          return editor.commands.insertContent(
            `<RunLocally mainLanguage="${mainLanguage}"></RunLocally>`
          )
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['RunLocally', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(RunLocally)
  }
})
