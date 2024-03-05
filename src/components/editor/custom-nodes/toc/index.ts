import { Node, type Editor } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'

import { Toc } from './view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [NodeName.TABLE_CONTENTS]: {
      insertTableContents: ({ endPos }: { endPos: number }) => ReturnType
    }
  }
}

export default Node.create({
  name: NodeName.TABLE_CONTENTS,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: `div[data-type='${NodeName.TABLE_CONTENTS}']`
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
      insertTableContents:
        ({ endPos }: { endPos: number }) =>
        ({ editor }: { editor: Editor }) => {
          return editor
            .chain()
            .insertContentAt(endPos, {
              type: NodeName.TABLE_CONTENTS
            })
            .focus()
            .run()
        }
    }
  },
  renderHTML() {
    const sections: { id: string; text: string }[] = []
    const section = findSection({ section: NodeName.TABLE_CONTENTS })
    // loop through headings with level 2
    this.editor?.state.doc.descendants((node: any) => {
      if (node.type.name === 'heading' && node.attrs.level === 2) {
        const id = node.textContent.toLowerCase().replaceAll(' ', '-')
        sections.push({
          text: node.textContent,
          id
        })
      }
    })

    const dom = document.createElement('div')
    dom.setAttribute('data-type', NodeName.TABLE_CONTENTS)

    const heading = document.createElement('h2')
    heading.textContent = section?.name as string

    const ul = document.createElement('ul')

    sections.forEach((section) => {
      const { id, text } = section
      const li = document.createElement('li')
      const p = document.createElement('p')
      const anchor = document.createElement('a')
      anchor.href = `#${id}`
      anchor.textContent = text

      p.append(anchor)
      li.append(p)
      ul.append(li)
    })

    const content = document.createElement('div')

    dom.append(heading, ul, content)

    return {
      dom,
      content
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(Toc)
  },
  addGlobalAttributes() {
    return [
      {
        types: ['heading'],
        attributes: {
          id: {
            default: null
          }
        }
      }
    ]
  }
})
