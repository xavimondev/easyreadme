import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Deploy } from '@/components/editor/views/deploy'

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
