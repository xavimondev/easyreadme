import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { ActionsBar } from './actions-bar'

export function ProjectStructure({ deleteNode, node }: any) {
  const { attrs } = node
  const tree = attrs.tree

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['project-structure']}</h2>
          <pre>
            <code className='language-markdown !outline-none'>{tree}</code>
          </pre>
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
