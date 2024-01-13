import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { EnvVariablesGuide } from '@/components/editor/components/env-variables-guide'

export default Node.create({
  name: NodeName.SETTING_UP,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'EnvVariablesGuide'
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      content: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertEnvVariablesGuide:
        ({ endPos, content }: { endPos: number; content: string }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.SETTING_UP,
              attrs: { content }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['EnvVariablesGuide', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(EnvVariablesGuide)
  }
})
