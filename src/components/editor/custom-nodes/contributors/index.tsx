import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer, type Editor } from '@tiptap/react'
import ReactDomServer from 'react-dom/server'

import { NodeName } from '@/types/builder'

import { Contributors } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.CONTRIBUTORS]: {
      insertContributors: ({ endPos, data }: { endPos: number; data?: any }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.CONTRIBUTORS,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: `div[data-type='${NodeName.CONTRIBUTORS}']`
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      },
      data: {
        default: {}
      }
    }
  },
  addCommands(): any {
    return {
      insertContributors:
        ({ endPos, data }: { endPos: number; data: any }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.CONTRIBUTORS,
              attrs: { data }
            })
            .focus('end')
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    const dom = document.createElement('div')
    dom.innerHTML = ReactDomServer.renderToStaticMarkup(
      // @ts-ignore
      <Contributors
        deleteNode={() => undefined}
        node={{
          attrs: { ...HTMLAttributes },
          type: {
            name: NodeName.CONTRIBUTORS
          }
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
    return ReactNodeViewRenderer(Contributors)
  }
})
