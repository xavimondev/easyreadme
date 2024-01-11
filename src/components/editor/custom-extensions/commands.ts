import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Commands } from '@/components/editor/components/commands'

export default Node.create({
  name: 'ext-commands',
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
