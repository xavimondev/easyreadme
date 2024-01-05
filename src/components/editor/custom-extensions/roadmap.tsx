import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Roadmap } from '@/components/editor/components/roadmap'

export default Node.create({
  name: 'roadmap',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Roadmap'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Roadmap', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Roadmap)
  }
})
