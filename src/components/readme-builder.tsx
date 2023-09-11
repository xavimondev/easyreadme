'use client'
import { useTemplate } from '@/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomEditor } from '@/components/editor'
import { CopyButton } from '@/components/copy-button'

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
export function ReadmeBuilder() {
  const templateSelected = useTemplate((state) => state.templateSelected)
  const defaultTemplate = templateSelected ? templateSelected.content : mkd

  return (
    <Tabs defaultValue='editor' className='w-full'>
      <TabsList className='grid w-56 grid-cols-2 h-9'>
        <TabsTrigger value='editor'>Editor</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='editor'>
        <div className='border border-black dark:border-white/20 w-full rounded-md p-5 bg-white/95 dark:bg-white/5 relative h-[calc(100vh-78px)]'>
          <CopyButton content={defaultTemplate} />
          <CustomEditor content={defaultTemplate} />
        </div>
      </TabsContent>
      <TabsContent value='code'>
        <div className='w-full rounded-md overflow-hidden h-[calc(100vh-78px)]'>
          <textarea
            className='border border-black dark:border-white/20 rounded-md text-black dark:text-white resize-none w-full h-full outline-none p-5 bg-white/95 dark:bg-white/5 text-base sm:text-lg'
            readOnly
            value={defaultTemplate}
          ></textarea>
        </div>
      </TabsContent>
    </Tabs>
  )
}
