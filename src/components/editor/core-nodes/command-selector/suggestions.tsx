import { type ReactNode } from 'react'
import { type Editor } from '@tiptap/core'
import { MoveDown, MoveLeft, MoveRight, MoveUp, Trash2 } from 'lucide-react'

type Suggestion = {
  title: string
  icon: ReactNode
  type: 'row' | 'col'
  command: (props: { editor: Editor }) => void
}

export const suggestions: Suggestion[] = [
  {
    title: 'Insert Above',
    icon: <MoveUp size={14} />,
    type: 'row',
    command: ({ editor }) => {
      console.log(editor)
      editor.chain().focus().addRowBefore().run()
    }
  },
  {
    title: 'Insert Below',
    icon: <MoveDown size={14} />,
    type: 'row',
    command: ({ editor }) => {
      editor.chain().focus().addRowBefore().run()
    }
  },
  {
    title: 'Delete Row',
    icon: <Trash2 size={14} />,
    type: 'row',
    command: ({ editor }) => {
      editor.chain().focus().deleteRow().run()
    }
  },
  {
    title: 'Insert Left',
    icon: <MoveLeft size={14} />,
    type: 'col',
    command: ({ editor }) => {
      editor.chain().focus().addColumnBefore().run()
    }
  },
  {
    title: 'Insert Right',
    icon: <MoveRight size={14} />,
    type: 'col',
    command: ({ editor }) => {
      editor.chain().focus().addColumnAfter().run()
    }
  },
  {
    title: 'Delete Column',
    icon: <Trash2 size={14} />,
    type: 'col',
    command: ({ editor }) => {
      editor.chain().focus().deleteColumn().run()
    }
  }
]
