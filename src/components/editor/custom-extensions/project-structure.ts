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
      tree: {
        default: undefined
      }
    }
  },
  addCommands(): any {
    return {
      insertProjectStructure:
        ({ tree }: { tree: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent(
            `<ProjectStructure tree="${tree}"></ProjectStructure>`
          )
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
