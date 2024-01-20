'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  addNewlinesBetweenBadges,
  replaceBadgesMarkdownToHtml,
  replaceBannerMarkdownToHtml
} from '@/utils'
import { EditorContent, useEditor } from '@tiptap/react'
import { useDebouncedCallback } from 'use-debounce'

import type { Editor, Extensions } from '@tiptap/react'

import { useBuilder } from '@/store'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'

export function CustomEditor({ content }: { content: string }) {
  const setContentTemplate = useBuilder((store) => store.setContentTemplate)
  const avoidUpdateState = useRef<boolean>(false)
  const debounce = useDebouncedCallback(({ editor }) => {
    const markdown = editor.storage.markdown.getMarkdown()
    // TODO: This stuff can be improved
    const markdownParsedWithBanner = replaceBannerMarkdownToHtml({ markdownContent: markdown })
    const markdownLines = addNewlinesBetweenBadges({ markdownContent: markdownParsedWithBanner })
    const content = replaceBadgesMarkdownToHtml({ markdownContent: markdownLines })
    setContentTemplate(content)
    avoidUpdateState.current = true
  }, 700)

  const editor = useEditor({
    editable: true,
    injectCSS: false,
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-405px)] md:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      }
    },
    extensions: DEFAULT_EXTENSIONS as Extensions,
    onUpdate: ({ editor }) => {
      debounce({ editor })
    }
  })

  // FIXME: https://github.com/xavimondev/easyreadme/issues/4
  const scrollToSelection = useCallback((editor: Editor) => {
    const { node } = editor.view.domAtPos(editor.state.selection.anchor)
    if (node) {
      ;(node as any).scrollIntoView?.(false)
    }
  }, [])

  useEffect(() => {
    if (!editor || avoidUpdateState.current) return

    if (content !== '') {
      editor.commands.setContent(content)
      scrollToSelection(editor)
    } else {
      editor.commands.clearContent()
    }
  }, [content])

  return (
    <div className='border border-black dark:border-white/20 w-full rounded-md p-9 bg-white/95 dark:bg-white/5 relative h-[calc(100vh-366px)] md:h-[calc(100vh-63px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
