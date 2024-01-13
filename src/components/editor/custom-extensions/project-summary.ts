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
      insertProjectSummary:
        ({ endPos, content }: { endPos: number; content: string }) =>
        ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.PROJECT_SUMMARY,
              attrs: { content }
            })
            .focus('end')
            .run()
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
