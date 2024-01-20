import { NodeName } from '@/types'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NODE_DEFAULT_VALUES } from '@/constants'
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
      ...NODE_DEFAULT_VALUES,
      content: {
        default: []
      }
    }
  },
  addCommands(): any {
    return {
      insertProjectSummary:
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
              type: NodeName.PROJECT_SUMMARY,
              attrs: { content, showPlaceholder }
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
