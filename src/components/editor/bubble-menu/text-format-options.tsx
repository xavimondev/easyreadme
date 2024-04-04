import { type Editor } from '@tiptap/core'
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LucideIcon,
  StrikethroughIcon,
  UnderlineIcon
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { Button } from '@/components/ui/button'

import { EditorBubbleItem } from './editor-bubble-item'

type SelectorItem = {
  name: string
  icon: LucideIcon
  command: (editor: Editor) => void
  isActive: (editor: Editor) => boolean
}

const items: SelectorItem[] = [
  {
    name: 'bold',
    isActive: (editor) => editor.isActive('bold'),
    command: (editor) => editor.chain().focus().toggleBold().run(),
    icon: BoldIcon
  },
  {
    name: 'italic',
    isActive: (editor) => editor.isActive('italic'),
    command: (editor) => editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon
  },
  {
    name: 'underline',
    isActive: (editor) => editor.isActive('underline'),
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon
  },
  {
    name: 'strike',
    isActive: (editor) => editor.isActive('strike'),
    command: (editor) => editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon
  },
  {
    name: 'code',
    isActive: (editor) => editor.isActive('code'),
    command: (editor) => editor.chain().focus().toggleCode().run(),
    icon: CodeIcon
  }
]

export function TextFormatOptions() {
  const readmeEditor = useBuilder((state) => state.readmeEditor)

  if (!readmeEditor) return null

  return (
    <div className='flex'>
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor)
          }}
        >
          <Button size='icon' className='rounded-none size-10' variant='ghost'>
            <item.icon
              className={cn('size-5', {
                'text-purple-400': item.isActive(readmeEditor)
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  )
}
