import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function Overview(props: any) {
  const { node, deleteNode } = props
  const { removeSectionFromTableOfContents } = useBuilder((store) => store)
  const { attrs, type } = node
  const { content } = attrs
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  useNode(props)

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div
          className='!outline-none content'
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <h2>{section?.name}</h2>
          {content === '' ? <p>Insert a brief overview of your project</p> : <p>{content}</p>}
        </div>
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
