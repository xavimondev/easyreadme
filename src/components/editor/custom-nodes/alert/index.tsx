import { Node, type ChainedCommands } from '@tiptap/core'
import { type Transaction } from '@tiptap/pm/state'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ReactDomServer from 'react-dom/server'

import { NodeName } from '@/types/builder'

import { Alert } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.ALERT]: {
      insertAlert: ({ id }: { id: string }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.ALERT,
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      id: {
        default: ''
      },
      isHTML: {
        default: false
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: `div[data-type='${NodeName.ALERT}']`
      }
    ]
  },
  addCommands(): any {
    return {
      insertAlert:
        ({ id }: { id: string }) =>
        ({ chain, tr }: { chain: () => ChainedCommands; tr: Transaction }) => {
          const { $from } = tr.selection
          // here we use tr.mapping.map to map the position between transaction steps
          const pos = tr.mapping.map($from.pos)

          return chain()
            .insertContentAt(pos, {
              type: NodeName.ALERT,
              attrs: { id, isHTML: false }
            })
            .focus()
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    const dom = document.createElement('div')
    dom.innerHTML = ReactDomServer.renderToStaticMarkup(
      <Alert
        deleteNode={() => undefined}
        node={{
          attrs: { ...HTMLAttributes, isHTML: true }
        }}
      />
    )
    dom.setAttribute('data-type', this.name)
    const content = document.createElement('div')

    return {
      dom,
      content
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(Alert)
  }
})
