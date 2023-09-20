'use client'
import { useCallback, useEffect } from 'react'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensiones'

export function CustomEditor({ content }: { content: string }) {
  const editor = useEditor({
    autofocus: 'end',
    injectCSS: false,
    content: content,
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

  // Scroll without focus
  const scrollToSelection = useCallback((editor: Editor) => {
    const { node } = editor.view.domAtPos(editor.state.selection.anchor)
    if (node) {
      ;(node as any).scrollIntoView?.(false)
    }
  }, [])

  useEffect(() => {
    if (!editor) return

    if (content !== '') {
      editor.commands.setContent(content)
      scrollToSelection(editor)
    }
  }, [content])

  return (
    <div className='border border-black dark:border-white/20 w-full rounded-md p-5 bg-white/95 dark:bg-white/5 relative h-[calc(100vh-80px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
