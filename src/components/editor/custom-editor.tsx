'use client'
import { type Editor, EditorContent } from '@tiptap/react'

export function CustomEditor({ editor }: { editor: Editor | null }) {
  return (
    <div className='border border-black dark:border-white/20 w-full rounded-md p-9 bg-white/95 dark:bg-slate-950/10 relative h-[calc(100vh-366px)] md:h-[calc(100vh-63px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
