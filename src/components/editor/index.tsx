'use client'
import { useCallback, useEffect } from 'react'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { useTemplate } from '@/store'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'

const DEFAULT_CONTENT = `
<p style="text-align:center;">
<img src='illustrations/process.svg' height="30%" width="30%" alt="Illustration" />
</p>

<p></p>
<p></p>

# ✨ Welcome to easyreadme

Ready to create a stunning README for your project? 👀


1. **Enter your GitHub Repository URL 🔗**.
2. **Choose a template that suits your project 🤔**.
3. **Click the Generate ⚡️ Button**.
`
export function CustomEditor({ content }: { content: string }) {
  const isGenerating = useTemplate((state) => state.isGenerating)
  const editor = useEditor({
    editable: false,
    // autofocus: 'all',
    injectCSS: false,
    content: DEFAULT_CONTENT,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-405px)] md:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      }
    },
    extensions: DEFAULT_EXTENSIONS
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
    } else {
      editor.commands.clearContent()
    }
  }, [content])

  useEffect(() => {
    if (!editor) return

    editor.setEditable(!isGenerating)
  }, [isGenerating])

  return (
    <div className='border border-black dark:border-white/20 w-full rounded-md p-5 bg-white/95 dark:bg-white/5 relative h-[calc(100vh-366px)] md:h-[calc(100vh-63px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
