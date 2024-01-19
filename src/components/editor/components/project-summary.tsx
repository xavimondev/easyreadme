import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from './actions-bar'
import { PlaceholderList } from '@/components/placeholder'

type DirectorySummaryListProps = {
  data: any
}

function DirectorySummaryList({ data }: DirectorySummaryListProps) {
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
export function ProjectSummary({ deleteNode, node }: any) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { attrs, type } = node
  const { content, showPlaceholder } = attrs
  const nodeName = type.name

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['project-summary']}</h2>
          {showPlaceholder ? (
            <PlaceholderList />
          ) : content.length === 0 ? (
            <p>Insert your project&apos;s summary.</p>
          ) : (
            <DirectorySummaryList data={content} />
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
