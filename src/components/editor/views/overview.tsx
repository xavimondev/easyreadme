import { NodeViewWrapper } from '@tiptap/react'

import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'
import { PlaceholderParagraph } from '@/components/placeholder'

export function Overview({ deleteNode, node }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { attrs, type } = node
  const { content, showPlaceholder } = attrs
  const nodeName = type.name

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['overview']}</h2>
          {showPlaceholder ? <PlaceholderParagraph /> : <p>{content}</p>}
        </div>
        <ActionsBar
          removeSection={() => {
            updateSection(nodeName)
            deleteNode()
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
