'use client'

import { useEffect } from 'react'
import markdown from 'highlight.js/lib/languages/markdown'
import { useTheme } from 'next-themes'
import Lowlight from 'react-lowlight'

type ReadmeCodeProps = {
  content: string
}

Lowlight.registerLanguage('markdown', markdown)

export function ReadmeCode({ content }: ReadmeCodeProps) {
  const { theme } = useTheme()

  useEffect(() => {
    const loadTheme = async () => {
      await import(`highlight.js/styles/base16/default-${theme}.css`)
    }
    content && loadTheme()
  }, [theme])

  return (
    <Lowlight
      language='markdown'
      value={content}
      className='border 
        border-black 
        dark:border-white/20 
        rounded-md 
        w-full 
        h-full 
        outline-none 
        text-base
        sm:text-lg 
        overflow-hidden 
        [&>code]:h-full 
        [&>code]:w-full 
        [&>code]:p-3 
        whitespace-pre-wrap
        [&>code]:scrollbar-hide'
    />
  )
}
