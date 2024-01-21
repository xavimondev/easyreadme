import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { RunLocally } from '@/components/editor/views/run-locally'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.RUN_LOCALLY]: {
      insertRunLocally: ({
        endPos,
        mainLanguage
      }: {
        endPos: number
        mainLanguage: string
      }) => ReturnType
    }
  }
}

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
        ({ editor }: { editor: Editor }) => {
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
