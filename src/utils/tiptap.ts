import { type Editor } from '@tiptap/core'

export const getPos = ({ editor }: { editor: Editor }) => {
  const lastNode = editor.state.doc.lastChild
  if (lastNode) {
    const lastNodePos = editor.state.doc.resolve(editor.state.doc.content.size - lastNode.nodeSize)
    const { pos } = lastNodePos
    return pos
  }
  return 0
}
