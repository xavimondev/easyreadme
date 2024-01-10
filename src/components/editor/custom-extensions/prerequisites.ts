import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Prerequisites } from '@/components/editor/components/prerequisites'

export default Node.create({
  name: 'prerequisites',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Prerequisites'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Prerequisites', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Prerequisites)
  }
})