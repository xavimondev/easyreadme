'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import { DEFAULT_EXTENSIONS } from './extensiones'

export function CustomEditor({ content }: { content: string }) {
  const editor = useEditor({
    injectCSS: false,
    autofocus: 'end',
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide'
      }
    },
    extensions: [...DEFAULT_EXTENSIONS],
    onUpdate: (e) => {
      const { editor } = e
      if (editor) {
        console.log(editor.storage.markdown.getMarkdown())
      }
    }
  })

  return <EditorContent editor={editor} className='w-full' />
}
