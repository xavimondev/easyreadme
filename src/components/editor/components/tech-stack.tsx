import { README_SECTIONS } from '@/constants'
import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'
import { PlaceholderList } from '@/components/placeholder'
import { useBuilder } from '@/store'

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
export function TechStack({ deleteNode, node }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { attrs, type } = node
  const { content, showPlaceholder } = attrs
  const nodeName = type.name

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['stack']}</h2>
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
            updateSection(nodeName)
            deleteNode()
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
