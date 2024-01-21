import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Banner } from '@/components/editor/views/banner'

export default Node.create({
  name: NodeName.BANNER,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Banner'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Banner', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Banner)
  }
})
