'use client'

import { EditorContent, type Editor } from '@tiptap/react'

export function CustomEditor({ editor }: { editor: Editor | null }) {
  return (
    <div className='border rounded-r-md border-black dark:border-white/20 w-full p-9 bg-white/95 dark:bg-neutral-800/20 relative h-[calc(100vh-366px)] md:h-[calc(100vh-63px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
