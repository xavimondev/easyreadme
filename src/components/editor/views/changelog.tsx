import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function ChangeLog({ deleteNode, node }: ViewProps) {
  const updateSection = useBuilder((store) => store.updateSection)
  const nodeName = node.type.name as NodeName
  const section = findSection({ section: nodeName })

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{section?.name}</h2>
          <blockquote className='leading-6' spellCheck='false'>
            <p>All notable changes to this project will be documented in this section.</p>
          </blockquote>
          <h4 spellCheck='false'>[Version X.X.X] - YYYY-MM-DD</h4>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            <li>
              <p>New features or enhancements added in this release.</p>
            </li>
            <li>
              <p>Fixes to errors or problems.</p>
            </li>
          </ul>
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