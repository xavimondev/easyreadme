import { type Editor } from '@tiptap/core'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, LucideIcon } from 'lucide-react'

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
    name: 'left',
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
    command: (editor) => editor.chain().focus().setTextAlign('left').run(),
    icon: AlignLeft
  },
  {
    name: 'center',
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
    command: (editor) => editor.chain().focus().setTextAlign('center').run(),
    icon: AlignCenter
  },
  {
    name: 'right',
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
    command: (editor) => editor.chain().focus().setTextAlign('right').run(),
    icon: AlignRight
  },
  {
    name: 'justify',
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
    command: (editor) => editor.chain().focus().setTextAlign('justify').run(),
    icon: AlignJustify
  }
]

export function TextAlignOptions() {
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
