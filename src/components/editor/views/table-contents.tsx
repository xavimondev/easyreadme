import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function TableContents({ deleteNode, node }: ViewProps) {
  const { updateSection, tableOfContents } = useBuilder((store) => store)
  const { type } = node
  // const data = attrs.content
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{section?.name}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            {tableOfContents.map((section: { id: string; name: string }) => {
              return (
                <li key={section.id}>
                  <p>
                    <a
                      target='_blank'
                      rel='noopener noreferrer nofollow'
                      className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                      href={`#${section.name}`}
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
