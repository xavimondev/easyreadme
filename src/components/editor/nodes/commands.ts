import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Commands } from '@/components/editor/views/commands'

export default Node.create({
  name: NodeName.COMMANDS,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Commands'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Commands', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Commands)
  }
})
