'use client'
import { useCompletion } from 'ai/react'
import { useEffect, useState } from 'react'
import { useTemplate } from '@/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomEditor } from '@/components/editor'
import { CodeBlock } from '@/components/code-block'

export function ReadmeBuilder() {
  const [contentReadme, setContentReadme] = useState('')
  const contentTemplate = useTemplate((state) => state.contentTemplate)
  const { completion } = useCompletion({
    id: 'readme'
  })

  useEffect(() => {
    if (!completion) return

    const content = `${contentTemplate}${completion}`
    setContentReadme(content)
  }, [completion])

  return (
    <>
      <Tabs defaultValue='editor' className='w-full'>
        <TabsList className='grid w-56 grid-cols-2 h-9'>
          <TabsTrigger value='editor'>Editor</TabsTrigger>
          <TabsTrigger value='code'>Code</TabsTrigger>
        </TabsList>
        <TabsContent value='editor'>
          <CustomEditor content={contentReadme} />
        </TabsContent>
        <TabsContent value='code'>
          <CodeBlock content={contentReadme} />
        </TabsContent>
      </Tabs>
    </>
  )
}
