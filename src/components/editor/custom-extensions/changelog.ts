import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ChangeLog } from '@/components/editor/components/changelog'

export default Node.create({
  name: 'changelog',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Changelog'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Changelog', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ChangeLog)
  }
})
