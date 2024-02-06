import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { NODE_DEFAULT_VALUES } from '@/constants'
import { EnvVariablesGuide } from '@/components/editor/views/env-variables-guide'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.SETTING_UP]: {
      insertEnvVariablesGuide: ({
        endPos,
        content,
        showPlaceholder
      }: {
        endPos: number
        content?: string
        showPlaceholder: boolean
      }) => ReturnType
    }
  }
}

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
      ...NODE_DEFAULT_VALUES,
      content: {
        default: []
      },
      html: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertEnvVariablesGuide:
        ({
          endPos,
          content,
          showPlaceholder
        }: {
          endPos: number
          content: string
          showPlaceholder: boolean
        }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.SETTING_UP,
              attrs: { content, showPlaceholder }
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
