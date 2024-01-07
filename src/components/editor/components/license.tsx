import { README_SECTIONS } from '@/constants'
import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'

export function License({ deleteNode, node }: any) {
  const { attrs } = node
  const name = attrs.name
  const url = attrs.url

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['license']}</h2>
          {name !== 'undefined' && url !== 'undefined' ? (
            <p>
              This project is licensed under the <strong>{name}</strong> - see the{' '}
              <a
                target='_blank'
                rel='noopener noreferrer nofollow'
                className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                href={url}
              >
                {name}
              </a>{' '}
              file for details.
            </p>
          ) : (
            <p>
              <strong>Add your License</strong>
            </p>
          )}
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
