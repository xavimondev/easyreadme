import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { NODE_DEFAULT_VALUES } from '@/constants'
import { TechStack } from '@/components/editor/views/tech-stack'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.TECH_STACK]: {
      insertTechStack: ({ endPos, content }: { endPos: number; content?: string }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.TECH_STACK,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'TechStack'
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
      insertTechStack:
        ({ endPos, content }: { endPos: number; content: string }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.TECH_STACK,
              attrs: { content }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['TechStack', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(TechStack)
  }
})
