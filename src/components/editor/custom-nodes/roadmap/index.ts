import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { Roadmap } from './view'

export default Node.create({
  name: NodeName.ROADMAP,
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
        tag: 'Roadmap'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['Roadmap', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Roadmap)
  }
})
