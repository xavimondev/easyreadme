import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { ProjectStructure } from '@/components/editor/views/project-structure'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.PROJECT_STRUCTURE]: {
      insertProjectStructure: ({ endPos, tree }: { endPos: number; tree: string }) => ReturnType
    }
  }
}

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
        async ({ editor }: { editor: Editor }) => {
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
