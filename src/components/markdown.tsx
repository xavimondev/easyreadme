'use client'
import { useEffect, useState } from 'react'
import { copyToClipboard } from '@/utils'
import { CheckIc, CopyIc } from '@/components/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomEditor } from '@/components/editor'

const mkd = `## Features

- **Fast:** since it's basically one regex and a huge if statement
- **Tiny:** it's 1kb of gzipped ES3
- **Simple:** pass a Markdown string, get back an HTML string

> **Note:** Tables are not yet supported. If you love impossible to read regular expressions, submit a PR!
>
> **Note on XSS:** Snarkdown [doesn't sanitize HTML](https://github.com/developit/snarkdown/issues/70), since its primary target usage doesn't require it.

# 🎄 AdventJS 2022

Although it has its roots in Catholicism, Advent has become a tradition where children got chocolate for 4 weeks, one per day, from 1 to 24 December. Here we adapt it to programming challenges.

## Solutions

| Challenge | Solution                                                                |
| --------- | ----------------------------------------------------------------------- |
| 1         | [Automating Christmas gift wrapping!](/v2022/challenge01/index.js)      |
`
export function Markdown() {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 1000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <Tabs defaultValue='editor' className='w-full'>
      <TabsList className='grid w-56 grid-cols-2 h-9'>
        <TabsTrigger value='editor'>Editor</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='editor'>
        <div className='border border-black dark:border-white/20 w-full rounded-md p-5 bg-white/95 dark:bg-white/5 relative h-[calc(100vh-78px)]'>
          <button
            className='absolute right-4 top-4 rounded-md p-1.5 hover:bg-white/10 transition-colors duration-200'
            onClick={async () => {
              setIsCopied(!isCopied)
              await copyToClipboard(mkd)
            }}
          >
            {isCopied ? <CheckIc className='w-5 h-5' /> : <CopyIc className='w-5 h-5' />}
          </button>
          <CustomEditor content={mkd} />
        </div>
      </TabsContent>
      <TabsContent value='code'>
        <div className='w-full rounded-md overflow-hidden h-[calc(100vh-78px)]'>
          <textarea
            className='border border-black dark:border-white/20 rounded-md text-black dark:text-white resize-none w-full h-full outline-none p-5 bg-white/95 dark:bg-white/5 text-base sm:text-lg'
            readOnly
            defaultValue={mkd}
          ></textarea>
        </div>
      </TabsContent>
    </Tabs>
  )
}
