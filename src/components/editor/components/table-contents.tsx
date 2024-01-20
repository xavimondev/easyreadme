import { NodeViewWrapper } from '@tiptap/react'

import { SectionState } from '@/types/builder'

import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/components/actions-bar'

export function TableContents({ deleteNode, node }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { attrs, type } = node
  const data = attrs.content
  const nodeName = type.name

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['table-contents']}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            {data.map((section: SectionState) => {
              return (
                <li key={section.id}>
                  <p>
                    <a
                      target='_blank'
                      rel='noopener noreferrer nofollow'
                      className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                      href={`#${section}`}
                    >
                      {section.name}
                    </a>
                  </p>
                </li>
              )
            })}
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
