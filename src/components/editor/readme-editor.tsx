'use client'

import { EditorContent, useEditor } from '@tiptap/react'

import { useBuilder } from '@/store'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'
import { CUSTOM_NODES } from '@/components/editor/nodes'

export function ReadmeEditor() {
  const setReadmeEditor = useBuilder((store) => store.setReadmeEditor)
  const editor = useEditor({
    editable: true,
    autofocus: 'start',
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-[325px] sm:max-w-none font-default focus:outline-none h-[calc(100vh-270px)] md:h-[calc(100vh-220px)] lg:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // prevent default event listeners from firing when slash command is active
          if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
            const slashCommand = document.querySelector('#slash-command')
            if (slashCommand) {
              return true
            }
          }
        }
      }
    },
    extensions: [...DEFAULT_EXTENSIONS, ...CUSTOM_NODES],
    onCreate: ({ editor }) => {
      setReadmeEditor(editor)
    }
  })

  return (
    <div className='border rounded-md lg:rounded-none lg:rounded-r-md border-black dark:border-white/20 w-full p-5 bg-white/95 dark:bg-neutral-800/20 relative h-[calc(100vh-242px)] sm:h-[calc(100vh-180px)] lg:h-[calc(100vh-60px)]'>
      <EditorContent editor={editor} />
    </div>
  )
}
