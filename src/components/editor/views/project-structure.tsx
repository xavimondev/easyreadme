import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function ProjectStructure({ deleteNode, node }: ViewProps) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { attrs, type } = node
  const tree = attrs.tree
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{section?.name}</h2>
          {tree && (
            <pre>
              <code className='language-markdown !outline-none'>{tree}</code>
            </pre>
          )}
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