import { NodeViewWrapper } from '@tiptap/react'
import { README_SECTIONS } from '@/constants'
import { ActionsBar } from './actions-bar'

export function EnvVariablesGuide({ deleteNode, node }: any) {
  const { attrs } = node
  const data = attrs.content

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['setting-up']}</h2>
          {typeof data === 'string' ? (
            <p>{data}</p>
          ) : (
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
          )}
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
