import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function Banner(props: any) {
  const { node, deleteNode } = props
  const { removeSectionFromTableOfContents } = useBuilder((store) => store)
  const nodeName = node.type.name as NodeName

  useNode(props)

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <a className='content' href='https://github.com/xavimondev/supaplay' target='_blank'>
          <img src='/placeholder.jpg' className='!m-0' width='100%' alt='Banner' />
        </a>
        <ActionsBar
          removeSection={() => {
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
