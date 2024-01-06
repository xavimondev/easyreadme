'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'
import Banner from './custom-extensions/banner'
import Acknowledgments from './custom-extensions/acknowledgments'
import Roadmap from './custom-extensions/roadmap'

export function CustomEditor() {
  const editor = useEditor({
    editable: true,
    injectCSS: false,
    content: '<Roadmap></Roadmap><Banner></Banner><Acknowledgments></Acknowledgments>',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-405px)] md:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      }
    },
    //@ts-ignore
    extensions: [...DEFAULT_EXTENSIONS, Roadmap, Banner, Acknowledgments]
  })

  // useEffect(() => {
  //   if (!editor) return
  //   editor
  //     .chain()
  //     .focus()
  //     .insertContent('<Roadmap></Roadmap><Banner></Banner><Acknowledgments></Acknowledgments>')
  //     .run()
  // }, [editor])

  return (
    <div className='border border-black dark:border-white/20 w-full rounded-md p-9 bg-white/95 dark:bg-slate-950/10 relative h-[calc(100vh-366px)] md:h-[calc(100vh-63px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
