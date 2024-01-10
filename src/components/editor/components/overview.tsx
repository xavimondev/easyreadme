import { README_SECTIONS } from '@/constants'
import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'

export function Overview({ deleteNode, node }: any) {
  const { attrs } = node
  const overview = attrs.content

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['overview']}</h2>
          <p>{overview}</p>
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
