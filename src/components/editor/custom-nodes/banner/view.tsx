import { useState } from 'react'
import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { useBuilder } from '@/store'

import { ActionsBarImage } from './actions-bar-image'

export function Banner(props: any) {
  const { node, deleteNode } = props
  const { removeSectionFromTableOfContents } = useBuilder((store) => store)
  const nodeName = node.type.name as NodeName
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg')

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a className='content' href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src={imageUrl} className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBarImage
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          removeSection={() => {
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
