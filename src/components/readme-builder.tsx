'use client'
import { useTemplate } from '@/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomEditor } from '@/components/editor'
import { CopyButton } from '@/components/copy-button'

export function ReadmeBuilder() {
  const contentTemplate = useTemplate((state) => state.contentTemplate)
  const defaultTemplate = contentTemplate ? contentTemplate : ''

  return (
    <>
      <Tabs defaultValue='editor' className='w-full'>
        <TabsList className='grid w-56 grid-cols-2 h-9'>
          <TabsTrigger value='editor'>Editor</TabsTrigger>
          <TabsTrigger value='code'>Code</TabsTrigger>
        </TabsList>
        <TabsContent value='editor'>
          <div className='border border-black dark:border-white/20 w-full rounded-md p-5 bg-white/95 dark:bg-white/5 relative h-[calc(100vh-78px)]'>
            <CopyButton content={defaultTemplate} />
            <CustomEditor />
          </div>
        </TabsContent>
        <TabsContent value='code'>
          <div className='w-full rounded-md overflow-hidden h-[calc(100vh-78px)]'>
            <textarea
              className='border border-black dark:border-white/20 rounded-md text-black dark:text-white resize-none w-full h-full outline-none p-5 bg-white/95 dark:bg-white/5 text-base sm:text-lg'
              value={defaultTemplate}
            ></textarea>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
