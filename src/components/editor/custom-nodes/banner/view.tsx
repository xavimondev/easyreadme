import { Editor } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { ActionsBarImage } from './actions-bar-image'

export function Banner({ editor, node }: { editor: Editor; node: any }) {
  const { attrs } = node
  const { imageUrl } = attrs

  const setImage = (imgUrl: string) => {
    editor.commands.updateAttributes(NodeName.BANNER, {
      imageUrl: imgUrl
    })
  }

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a className='content' href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src={imageUrl} className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBarImage setImageUrl={setImage} />
      </div>
    </NodeViewWrapper>
  )
}
