import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
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
      content: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertTechStack:
        ({ content }: { content: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent({
            type: 'techStack',
            attrs: { content }
          })
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
