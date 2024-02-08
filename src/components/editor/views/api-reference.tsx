import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function ApiReference(props: any) {
  const { node, deleteNode } = props
  const { updateSection, removeSectionFromTableOfContents } = useBuilder((store) => store)
  const nodeName = node.type.name as NodeName
  const section = findSection({ section: nodeName })

  useNode(props)

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div
          className='!outline-none content'
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <h2>{section?.name}</h2>
          <div>
            <h4>Get all products</h4>
            <pre>
              <code className='language-http'> GET /api/products</code>
            </pre>
            <table className='w-full text-left rtl:text-right text-gray-500 dark:text-gray-300'>
              <thead className='font-bold'>
                <tr className='[&>th]:border-2 [&>th]:dark:border-neutral-700 [&>th]:!px-5 [&>th]:!py-2 [&>th]:!m-0'>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className='[&>td]:border-2 [&>td]:dark:border-neutral-700 [&>td]:!px-5 [&>td]:!py-2'>
                  <td>
                    <code>api_key</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <strong>A brief description</strong>
                  </td>
                </tr>
                <tr className='[&>td]:border-2 [&>td]:dark:border-neutral-700 [&>td]:!px-5 [&>td]:!py-2'>
                  <td>
                    <code>api_key</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <strong>A brief description</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4>Get product</h4>
            <pre>
              <code className='language-http'> GET /api/product/${'{id}'}</code>
            </pre>
            <table className='w-full text-left rtl:text-right text-gray-500 dark:text-gray-300'>
              <thead className='font-bold'>
                <tr className='[&>th]:border-2 [&>th]:dark:border-neutral-700 [&>th]:!px-5 [&>th]:!py-2 [&>th]:!m-0'>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className='[&>td]:border-2 [&>td]:dark:border-neutral-700 [&>td]:!px-5 [&>td]:!py-2'>
                  <td>
                    <code>api_key</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <strong>A brief description</strong>
                  </td>
                </tr>
                <tr className='[&>td]:border-2 [&>td]:dark:border-neutral-700 [&>td]:!px-5 [&>td]:!py-2'>
                  <td>
                    <code>api_key</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <strong>A brief description</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
