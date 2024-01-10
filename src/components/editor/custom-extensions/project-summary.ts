import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ProjectSummary } from '@/components/editor/components/project-summary'

export default Node.create({
  name: 'projectSummary',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'ProjectSummary'
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
      insertProjectSummary:
        ({ content }: { content: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent({
            type: 'projectSummary',
            attrs: { content }
          })
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ProjectSummary', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ProjectSummary)
  }
})
