import { NodeName } from '@/types'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { RunLocally } from '@/components/editor/components/run-locally'

export default Node.create({
  name: NodeName.RUN_LOCALLY,
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
      endPos: {
        default: 0
      },
      mainLanguage: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertRunLocally:
        ({ endPos, mainLanguage }: { endPos: number; mainLanguage: string }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.RUN_LOCALLY,
              attrs: {
                mainLanguage
              }
            })
            .focus('end')
            .run()
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
