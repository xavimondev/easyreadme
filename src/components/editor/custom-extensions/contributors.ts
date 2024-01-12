import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeName } from '@/types'
import { ContributorsGallery, ContributorsTable } from '@/components/editor/components/contributors'

export const ContributorsGalleryNode = Node.create({
  name: NodeName.CONTRIBUTORS_GALLERY,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'ContributorsGallery'
      }
    ]
  },
  addAttributes() {
    return {
      owner: {
        default: undefined
      },
      repository: {
        default: undefined
      }
    }
  },
  addCommands(): any {
    return {
      insertContributorsGallery:
        ({ owner, repository }: { owner: string; repository: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent(
            `<ContributorsGallery owner="${owner}" repository="${repository}"></ContributorsGallery>`
          )
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ContributorsGallery', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ContributorsGallery)
  }
})

export const ContributorsTableNode = Node.create({
  name: NodeName.CONTRIBUTORS_TABLE,
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'ContributorsTable'
      }
    ]
  },
  addAttributes() {
    return {
      listContributors: {
        default: []
      },
      repository: {
        default: ''
      }
    }
  },
  addCommands(): any {
    return {
      insertContributorsTable:
        ({ listContributors, repository }: { listContributors: []; repository: string }) =>
        async ({ editor }: any) => {
          return editor.commands.insertContent({
            type: 'contributorsTable',
            attrs: { listContributors, repository }
          })
        }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ContributorsTable', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ContributorsTable)
  }
})
