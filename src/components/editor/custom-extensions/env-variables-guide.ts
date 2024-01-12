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
      content: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertEnvVariablesGuide:
        ({ content }: { content: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent({
            type: 'envVariablesGuide',
            attrs: { content }
          })
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
