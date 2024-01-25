import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { ChangeLog } from '@/components/editor/views/changelog'

export default Node.create({
  name: NodeName.CHANGELOG,
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