'use client'
import { useEffect } from 'react'
import { useCompletion } from 'ai/react'
import { EditorContent, useEditor } from '@tiptap/react'
import { useTemplate } from '@/store'
import { DEFAULT_EXTENSIONS } from './extensiones'

export function CustomEditor() {
  const contentTemplate = useTemplate((state) => state.contentTemplate)
  const { completion } = useCompletion({
    id: 'readme'
  })

  const editor = useEditor({
    autofocus: 'end',
    injectCSS: false,
    content: contentTemplate,
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
    if (!editor) return

    if (completion !== '') {
      const content = `${contentTemplate}${completion}`
      editor.commands.setContent(content)
    }
  }, [completion])

  return <EditorContent editor={editor} className='w-full' />
}
