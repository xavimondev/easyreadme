import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'
import { PlaceholderGuide } from '@/components/placeholder'

type GuideListProps = {
  data: any
}

function GuideList({ data }: GuideListProps) {
  return (
    <>
      {data.map(({ name, steps }: any) => {
        return (
          <div key={name}>
            <h4>{name}</h4>
            <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
              {steps.map((step: string, index: number) => {
                return (
                  <li key={index}>
                    <p>{step}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </>
  )
}

export function EnvVariablesGuide({ deleteNode, node }: ViewProps) {
  const { attrs, type } = node
  const { content, showPlaceholder } = attrs
  const { updateSection, removeSectionFromTableOfContents } = useBuilder((store) => store)
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{section?.name}</h2>
          {showPlaceholder ? (
            <PlaceholderGuide />
          ) : content.length === 0 ? (
            <p>Insert your environment variables.</p>
          ) : (
            <GuideList data={content} />
          )}
        </div>
        <ActionsBar
          removeSection={() => {
            updateSection(nodeName)
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
