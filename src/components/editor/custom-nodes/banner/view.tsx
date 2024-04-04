import { useState } from 'react'
import { NodeViewWrapper } from '@tiptap/react'

import { ActionsBarImage } from './actions-bar-image'

export function Banner() {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg')

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a className='content' href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src={imageUrl} className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBarImage setImageUrl={setImageUrl} imageUrl={imageUrl} />
      </div>
    </NodeViewWrapper>
  )
}
