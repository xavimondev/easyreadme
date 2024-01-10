import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { ActionsBar } from './actions-bar'

export function Prerequisites({ deleteNode }: any) {
  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['prerequisites']}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            <li>
              <p>Prerequisite 1</p>
            </li>
            <li>
              <p>Prerequisite 2</p>
            </li>
          </ul>
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
