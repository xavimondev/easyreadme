import { NodeName } from '@/types'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NODE_DEFAULT_VALUES } from '@/constants'
import { TechStack } from '@/components/editor/components/tech-stack'

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
      }
    }
  },
  addCommands(): any {
    return {
      insertTechStack:
        ({
          endPos,
          content,
          showPlaceholder
        }: {
          endPos: number
          content: string
          showPlaceholder: boolean
        }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.TECH_STACK,
              attrs: { content, showPlaceholder }
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
