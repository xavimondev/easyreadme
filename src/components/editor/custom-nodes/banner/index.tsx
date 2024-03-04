import { Node, type Editor } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ReactDomServer from 'react-dom/server'

import { NodeName } from '@/types/builder'

import { Banner } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.BANNER]: {
      insertBanner: ({ endPos }: { endPos: number }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.BANNER,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: `div[data-type='${NodeName.BANNER}']`
      }
    ]
  },
  addAttributes() {
    return {
      endPos: {
        default: 0
      }
    }
  },
  addCommands(): any {
    return {
      insertBanner:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.BANNER
            })
            .focus()
            .run()
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    const dom = document.createElement('div')
    dom.innerHTML = ReactDomServer.renderToStaticMarkup(
      <Banner
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
    return ReactNodeViewRenderer(Banner)
  }
})
