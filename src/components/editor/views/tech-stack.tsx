import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/views/actions-bar'
import { PlaceholderList } from '@/components/placeholder'

type TechListProps = {
  data: any
}

function TechList({ data }: TechListProps) {
  return (
    <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
      {data.map(({ name, link, description }: any) => {
        return (
          <li key={name}>
            <p>
              <a
                target='_blank'
                rel='noopener noreferrer nofollow'
                className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                href={link}
              >
                {name}
              </a>
              : {description}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
export function TechStack(props: any) {
  const { node, deleteNode } = props
  const { removeSectionFromTableOfContents } = useBuilder((store) => store)
  const { attrs, type } = node
  const { content, showPlaceholder } = attrs
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
          {showPlaceholder ? (
            <PlaceholderList />
          ) : content.length === 0 ? (
            <p>Include a concise explanation about the Tech Stack employed.</p>
          ) : (
            <TechList data={content} />
          )}
        </div>
        <ActionsBar
          removeSection={() => {
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
