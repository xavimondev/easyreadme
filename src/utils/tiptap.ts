import { findChildren, type Editor } from '@tiptap/core'

import { NodeName } from '@/types/builder'

export const getPos = ({ editor }: { editor: Editor }) => {
  const lastNode = editor.state.doc.lastChild
  if (lastNode) {
    const lastNodePos = editor.state.doc.resolve(editor.state.doc.content.size - lastNode.nodeSize)
    const { pos } = lastNodePos
    return pos
  }
  return 0
}

export const updateNode = ({
  editor,
  node,
  data
}: {
  editor: Editor
  node: NodeName
  data: any
}) => {
  editor.chain().updateAttributes(node, data).run()
}

export const removeNode = ({ editor, nodex }: { editor: Editor; nodex: NodeName }) => {
  const nodes = Object.values(editor.schema.nodes ?? {}).filter((node) =>
    node.name.includes('custom-')
  )

  editor.commands.forEach(nodes, (_, { tr, commands }) => {
    const item = findChildren(tr.doc, (node) => {
      return node.type.name === nodex
    })?.[0]
    if (!item) {
      return true
    }
    return commands.deleteRange({
      from: item.pos,
      to: item.pos + item.node.nodeSize
    })
  })
}
