import { ReactNode } from 'react'
import { type Editor, type Range } from '@tiptap/core'
import {
  AlertTriangle,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  InfoIcon,
  Lightbulb,
  List,
  ListOrdered,
  MessageCircleWarning,
  MessageSquareWarning,
  TableIcon,
  Text,
  TextQuote
} from 'lucide-react'

type BlockItem = {
  title: string
  description: string
  icon: ReactNode
  searchTerms?: string[]
  command: (props: { editor: Editor; range: Range }) => void
}

export const groupBasicItems: BlockItem[] = [
  {
    title: 'Paragraph',
    description: 'Just start typing with plain text.',
    searchTerms: ['p', 'paragraph'],
    icon: <Text size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
    }
  },
  {
    title: 'Heading 1',
    description: 'Big section heading.',
    searchTerms: ['title', 'big', 'large'],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    }
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading.',
    searchTerms: ['subtitle', 'medium'],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    }
  },
  {
    title: 'Heading 3',
    description: 'Small section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    }
  },
  {
    title: 'Heading 4',
    description: 'Smaller section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading4 size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
    }
  },
  {
    title: 'Heading 5',
    description: 'Even smaller section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading5 size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 5 }).run()
    }
  },
  {
    title: 'Heading 6',
    description: 'Tiny section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading6 size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 6 }).run()
    }
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bullet list.',
    searchTerms: ['unordered', 'point'],
    icon: <List size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    }
  },
  {
    title: 'Numbered List',
    description: 'Create a list with numbering.',
    searchTerms: ['ordered'],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    }
  },
  {
    title: 'Quote',
    description: 'Capture a quote.',
    searchTerms: ['blockquote'],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run()
  },
  {
    title: 'Code',
    description: 'Capture a code snippet.',
    searchTerms: ['codeblock'],
    icon: <Code size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
  },
  {
    title: 'Table',
    description: 'Create a table magics.',
    searchTerms: ['table'],
    icon: <TableIcon size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor.chain().focus().deleteRange(range).insertTable().run()
  }
]

export const groupAlertItems: BlockItem[] = [
  {
    title: 'Note',
    description: 'Create a informative alert.',
    searchTerms: ['alert', 'note', 'informative', 'useful'],
    icon: <InfoIcon size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertAlert({
          id: 'info'
        })
        .run()
  },
  {
    title: 'Tip',
    description: 'Create a tip alert.',
    searchTerms: ['alert', 'tip', 'advice'],
    icon: <Lightbulb size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertAlert({
          id: 'tip'
        })
        .run()
  },
  {
    title: 'Important',
    description: 'Create a important alert.',
    searchTerms: ['alert', 'important', 'docs'],
    icon: <MessageSquareWarning size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertAlert({
          id: 'important'
        })
        .run()
  },
  {
    title: 'Warning',
    description: 'Create a warning alert.',
    searchTerms: ['alert', 'urgent', 'attention'],
    icon: <AlertTriangle size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertAlert({
          id: 'warning'
        })
        .run()
  },
  {
    title: 'Caution',
    description: 'Create a caution alert.',
    searchTerms: ['alert', 'risk', 'advice'],
    icon: <MessageCircleWarning size={18} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertAlert({
          id: 'caution'
        })
        .run()
  }
]
