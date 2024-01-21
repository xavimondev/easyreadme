import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Faq } from '@/components/editor/views/faq'

export default Node.create({
  name: NodeName.FAQ,
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
