import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function Banner({ deleteNode, node }: ViewProps) {
  const { updateSection, removeSectionFromTableOfContents } = useBuilder((store) => store)
  const nodeName = node.type.name as NodeName

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src='/placeholder.jpg' className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBar
          removeSection={() => {
            updateSection(nodeName)
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
