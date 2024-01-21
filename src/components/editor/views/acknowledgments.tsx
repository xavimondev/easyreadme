import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function Acknowledgments({ deleteNode, node }: ViewProps) {
  const updateSection = useBuilder((store) => store.updateSection)
  const nodeName = node.type.name as NodeName

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['acknowledgements']}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            <li>
              <p>
                [Awesome Tool](
                <a
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                  href='https://awesometool.link'
                >
                  https://awesometool.link
                </a>
                )
              </p>
            </li>
            <li>
              <p>
                [Awesome Inspiration](
                <a
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                  href='https://altavista.com'
                >
                  https://awesomeinsp.link
                </a>
                )
              </p>
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
