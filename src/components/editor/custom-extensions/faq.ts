import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Faq } from '@/components/editor/components/faq'

export default Node.create({
  name: 'faq',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Faq'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Faq', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Faq)
  }
})
