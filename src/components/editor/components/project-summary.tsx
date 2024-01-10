import { README_SECTIONS } from '@/constants'
import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'

export function ProjectSummary({ deleteNode, node }: any) {
  const { attrs } = node
  const stack = attrs.content
  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['project-summary']}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            {stack.map(({ name, link, description }: any) => {
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
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
