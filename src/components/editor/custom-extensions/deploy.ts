import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Deploy } from '@/components/editor/components/deploy'

export default Node.create({
  name: 'deploy',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Deploy'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Deploy', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Deploy)
  }
})