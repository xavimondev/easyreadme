import { README_SECTIONS } from '@/constants'
import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'
import { PlaceholderParagraph } from '@/components/placeholder'

export function Overview({ deleteNode, node }: any) {
  const { attrs } = node
  const { content, showPlaceholder } = attrs

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['overview']}</h2>
          {showPlaceholder ? <PlaceholderParagraph /> : <p>{content}</p>}
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
