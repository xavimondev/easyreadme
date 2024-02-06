import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { NODE_DEFAULT_VALUES } from '@/constants'
import { ProjectSummary } from '@/components/editor/views/project-summary'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.PROJECT_SUMMARY]: {
      insertProjectSummary: ({
        endPos,
        content,
        showPlaceholder
      }: {
        endPos: number
        content?: Array<{ name: string; link: string; description: string }>
        showPlaceholder: boolean
      }) => ReturnType
    }
  }
}

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
      },
      html: {
        default: ''
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
          content: Array<{ name: string; link: string; description: string }>
          showPlaceholder: boolean
        }) =>
        ({ editor }: { editor: Editor }) => {
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
