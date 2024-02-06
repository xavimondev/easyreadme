'use client'

import { copyToClipboard } from '@/utils'
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
        const html = readmeEditor
          ?.getJSON()
          .content?.map((doc) => {
            const { type } = doc
            if (type?.includes('custom-')) {
              return doc.attrs?.html + `\n`
            } else if (type === 'paragraph') {
              const content = doc.content
              let container = ``
              if (Array.isArray(content)) {
                container = `<span align='center'>\n`
                const listBadges = content
                  .map((con) => {
                    const {
                      // @ts-ignore
                      attrs: { data }
                    } = con
                    const { label, url } = data
                    return `<img src='${url}' alt='${label}' />\n`
                  })
                  .join('\n')
                container += `${listBadges}</span>\n\n`
              }
              return container
            }
            return ''
          })
          .join('\n') as string

        const md = NodeHtmlMarkdown.translate(html, {
          bulletMarker: '-',
          textReplace: [[/\\_/g, '_']],
          useInlineLinks: false
        })

        await copyToClipboard(md)
      }}
    >
      <Code2 className='w-5 h-5 mr-1' />
      Code
    </Button>
  )
}
