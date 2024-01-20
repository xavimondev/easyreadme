import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Acknowledgments } from '@/components/editor/components/acknowledgments'

export default Node.create({
  name: NodeName.ACKNOWLEDGEMENTS,
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
