import { NodeViewWrapper } from '@tiptap/react'

import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/components/actions-bar'

export function ChangeLog({ deleteNode, extension }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { name } = extension

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['changelog']}</h2>
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
            updateSection(name)
            deleteNode()
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
