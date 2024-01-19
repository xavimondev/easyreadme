import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from './actions-bar'

export function Commands({ deleteNode, extension }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { name } = extension

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['commands']}</h2>
          <p>This extension contributes the following commands to the Command palette:</p>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            <li>
              <p>
                <strong>Command name</strong>: Command description.
              </p>
            </li>
            <li>
              <p>
                <strong>Authenticate</strong>: Command description.
              </p>
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
