import { README_SECTIONS } from '@/constants'
import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'

export function Roadmap({ deleteNode }: any) {
  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['roadmap']}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            <li>
              <p>
                [X] <strong>Task 1:</strong>Implement feature one.
              </p>
            </li>
            <li>
              <p>
                [&nbsp;&nbsp;] <strong>Task 2:</strong>Implement feature two.
              </p>
            </li>
            <li>
              <p>
                [&nbsp;&nbsp;] <strong>Task 3:</strong>Implement feature three.
              </p>
            </li>
          </ul>
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
