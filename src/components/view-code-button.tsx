'use client'

import { useEffect, useState } from 'react'
import { addBreaklineBetweenBadges, copyToClipboard, replaceBadgesMarkdownToHtml } from '@/utils'
import { Check, Code2 } from 'lucide-react'
import { NodeHtmlMarkdown } from 'node-html-markdown'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { Button } from '@/components/ui/button'

export function ViewCodeButton() {
  const readmeEditor = useBuilder((store) => store.readmeEditor)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (clicked) {
      timeoutId = setTimeout(() => {
        setClicked(false)
      }, 1500)
    }

    return () => clearTimeout(timeoutId)
  }, [clicked])

  return (
    <Button
      className={cn('p-2 copy-button group', clicked && 'animate')}
      onClick={async () => {
        setClicked(true)
        const html = readmeEditor?.getHTML() as string
        const md = NodeHtmlMarkdown.translate(html, {
          bulletMarker: '-',
          textReplace: [
            [/\\_/g, '_'],
            [/\\/g, '']
          ],
          useInlineLinks: false
        })
        const markdown = addBreaklineBetweenBadges({ markdownContent: md })
        const sanitizeMd = replaceBadgesMarkdownToHtml({ markdownContent: markdown })
        await copyToClipboard(sanitizeMd)
      }}
    >
      {!clicked ? (
        <Code2 className='size-5 mr-1 group-hover:animate-shaking' />
      ) : (
        <Check className='size-5 mr-1' />
      )}
      Copy Code
    </Button>
  )
}
