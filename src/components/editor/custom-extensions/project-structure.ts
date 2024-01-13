import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { ProjectStructure } from '@/components/editor/components/project-structure'

export default Node.create({
  name: NodeName.PROJECT_STRUCTURE,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'ProjectStructure'
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      tree: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertProjectStructure:
        ({ endPos, tree }: { endPos: number; tree: string }) =>
        async ({ editor }: any) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.PROJECT_STRUCTURE,
              attrs: {
                tree
              }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ProjectStructure', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ProjectStructure)
  }
})
