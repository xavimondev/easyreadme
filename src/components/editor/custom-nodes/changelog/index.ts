import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { ChangeLog } from './view'

export default Node.create({
  name: NodeName.CHANGELOG,
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      html: {
        default: ''
      }
    }
  },
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
