'use client'
import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { DEFAULT_EXTENSIONS } from './extensiones'

export function CustomEditor({ content }: { content: string }) {
  const editor = useEditor({
    injectCSS: false,
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide'
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

  useEffect(() => {
    if (!editor || content === '') return

    editor.commands.setContent(content)

    return () => {
      editor.destroy()
    }
  }, [content])

  return <EditorContent editor={editor} className='w-full' />
}
