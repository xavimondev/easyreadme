import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'

export function Banner({ deleteNode }: any) {
  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src='/placeholder.jpg' className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
