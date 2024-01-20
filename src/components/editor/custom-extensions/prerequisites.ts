import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Prerequisites } from '@/components/editor/components/prerequisites'

export default Node.create({
  name: NodeName.PREREQUISITES,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'Prerequisites'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Prerequisites', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Prerequisites)
  }
})
