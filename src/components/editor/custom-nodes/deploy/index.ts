import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Deploy } from './view'

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
  addAttributes() {
    return {
      html: {
        default: ''
      }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['Deploy', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Deploy)
  }
})
