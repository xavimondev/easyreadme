import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { Deploy } from '@/components/editor/components/deploy'

export default Node.create({
  name: NodeName.DEPLOY,
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
