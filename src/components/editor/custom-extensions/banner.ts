import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Banner } from '@/components/editor/components/banner'

export default Node.create({
  name: 'banner',
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
