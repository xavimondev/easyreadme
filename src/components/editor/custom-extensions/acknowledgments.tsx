import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Acknowledgments } from '@/components/editor/components/acknowledgments'

export default Node.create({
  name: 'acknowledgments',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Acknowledgments'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Acknowledgments', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Acknowledgments)
  }
})