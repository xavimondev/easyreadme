import { NodeViewWrapper } from '@tiptap/react'

import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function Faq({ deleteNode, extension }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { name } = extension

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['faq']}</h2>
          <h4 spellCheck='false'>1. What is this project about?</h4>
          <p>
            This project aims to{' '}
            <strong>briefly describe your project&apos;s purpose and goals</strong>.
          </p>
          <h4 spellCheck='false'>2. What is this project about?</h4>
          <p>
            Yes, we welcome contributions! Please refer to our{' '}
            <a
              target='_blank'
              rel='noopener noreferrer nofollow'
              className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
              href='CONTRIBUTING.md'
            >
              Contribution Guidelines
            </a>{' '}
            for more information on how to contribute.
          </p>
          <h4 spellCheck='false'>3. What is this project about?</h4>
          <p>Your answer.</p>
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
