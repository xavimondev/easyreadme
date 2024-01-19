import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { useBuilder } from '@/store'
import { PlaceholderGuide } from '@/components/placeholder'
import { ActionsBar } from './actions-bar'

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
export function EnvVariablesGuide({ deleteNode, node }: any) {
  const { attrs, type } = node
  const { content, showPlaceholder } = attrs
  const updateSection = useBuilder((store) => store.updateSection)
  const nodeName = type.name

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['setting-up']}</h2>
          {showPlaceholder ? (
            <PlaceholderGuide />
          ) : content.length === 0 ? (
            <p>Insert your environment variables</p>
          ) : (
            <GuideList data={content} />
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
