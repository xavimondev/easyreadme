import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { ProjectSummary } from '@/components/editor/components/project-summary'

export default Node.create({
  name: NodeName.PROJECT_SUMMARY,
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
        ({ editor }: any) => {
          return editor.commands.insertContent({
            type: NodeName.PROJECT_SUMMARY,
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
