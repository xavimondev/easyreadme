import { NodeViewWrapper } from '@tiptap/react'

import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function Banner({ deleteNode, extension }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { name } = extension

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src='/placeholder.jpg' className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBar
          removeSection={() => {
            updateSection(name)
            deleteNode()
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
