import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { ActionsBar } from './actions-bar'

export function Deploy({ deleteNode }: any) {
  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['deploy']}</h2>
          <p>Insert your application URL</p>
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}