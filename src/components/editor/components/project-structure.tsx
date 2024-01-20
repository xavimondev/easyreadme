import { NodeViewWrapper } from '@tiptap/react'

import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/components/actions-bar'

export function ProjectStructure({ deleteNode, node }: any) {
  const { attrs, type } = node
  const tree = attrs.tree
  const nodeName = type.name
  const updateSection = useBuilder((store) => store.updateSection)

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['project-structure']}</h2>
          {tree && (
            <pre>
              <code className='language-markdown !outline-none'>{tree}</code>
            </pre>
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
