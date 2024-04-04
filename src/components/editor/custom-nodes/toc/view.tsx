import React, { useCallback, useEffect, useState } from 'react'
import { type Node } from '@tiptap/pm/model'
import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'

// Componente built based on https://tiptap.dev/docs/editor/guide/node-views/examples#table-of-contents
type Heading = { id: string; text: string }

export function Toc(props: any) {
  const { node, editor } = props
  const { type } = node
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  const [items, setItems] = useState<Heading[]>([])

  const handleUpdate = useCallback(() => {
    const headings: Heading[] = []
    const transaction = editor.state.tr

    editor.state.doc.descendants((node: Node, pos: number) => {
      if (node.type.name === 'heading' && node.attrs.level === 2) {
        const id = node.textContent.toLowerCase().replaceAll(' ', '-')

        if (node.attrs.id !== id) {
          transaction.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id
          })
        }

        headings.push({
          text: node.textContent,
          id
        })
      }
    })

    transaction.setMeta('addToHistory', false)
    transaction.setMeta('preventUpdate', true)

    editor.view.dispatch(transaction)

    setItems(headings)
  }, [editor])

  useEffect(() => {
    // Workaround from: https://github.com/ueberdosis/tiptap/issues/3764#issuecomment-1546629928
    setTimeout(() => {
      handleUpdate()
    })
  }, [])

  useEffect(() => {
    if (!editor) {
      return
    }

    editor.on('update', handleUpdate)

    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor])

  return (
    <NodeViewWrapper>
      <div className='relative group'>
        <div>
          <h2>{section?.name}</h2>
          <ul className='list-disc list-outside leading-4 tight' data-tight='true'>
            {items.map(({ id, text }) => {
              return (
                <li key={id}>
                  <p>
                    <a
                      target='_blank'
                      rel='noopener noreferrer nofollow'
                      className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                      href={`#${id}`}
                    >
                      {text}
                    </a>
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
