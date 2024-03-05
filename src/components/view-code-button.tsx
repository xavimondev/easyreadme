'use client'

import { addBreaklineBetweenBadges, copyToClipboard, replaceBadgesMarkdownToHtml } from '@/utils'
import { Code2 } from 'lucide-react'
import { NodeHtmlMarkdown } from 'node-html-markdown'

import { useBuilder } from '@/store'
import { Button } from '@/components/ui/button'

export function ViewCodeButton() {
  const readmeEditor = useBuilder((store) => store.readmeEditor)

  return (
    <Button
      className='p-2'
      onClick={async () => {
        const html = readmeEditor?.getHTML() as string
        const md = NodeHtmlMarkdown.translate(html, {
          bulletMarker: '-',
          textReplace: [[/\\_/g, '_']],
          useInlineLinks: false
        })
        const markdown = addBreaklineBetweenBadges({ markdownContent: md })
        const sanitizeMd = replaceBadgesMarkdownToHtml({ markdownContent: markdown })
        await copyToClipboard(sanitizeMd)
      }}
    >
      <Code2 className='w-5 h-5 mr-1' />
      Code
    </Button>
  )
}
