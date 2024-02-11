import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function TableContents(props: any) {
  const { node, deleteNode } = props
  const { updateSection, tableOfContents } = useBuilder((store) => store)
  const { type } = node
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  useNode(props)

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div
          className='!outline-none content'
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
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
                      href={`#${section.name.toLowerCase().replaceAll(' ', '-')}`}
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
