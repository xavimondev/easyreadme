import { type Node } from '@tiptap/pm/model'
import { NodeViewWrapper } from '@tiptap/react'

export function Badge({ node }: { node: Node }) {
  const { attrs } = node
  const data = attrs.data
  const { label, url } = data

  return (
    <NodeViewWrapper className='!p-0 mr-3' as='span'>
      <img className='inline !m-0' src={url} alt={label} draggable={true} />
    </NodeViewWrapper>
  )
}
