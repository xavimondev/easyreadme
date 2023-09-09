import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { GitIc } from '@/components/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Markdown } from '@/components/markdown'

export default function Builder() {
  return (
    <main className='p-4 min-h-screen'>
      <div className='h-full w-full flex gap-2'>
        <ScrollArea className='max-w-[330px] h-[calc(100vh-35px)]'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Source</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className='relative flex w-full items-center'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/40'>
                    <GitIc className='w-4 h-4' />
                  </div>
                  <Input
                    type='url'
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                    required
                    name='urlRepository'
                    className='h-11 pl-9 focus-visible:border-gray-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60'
                    placeholder='https://github.com/xavimondev/readme-creator'
                  />
                </div>
              </form>
              <div className='mt-5 w-full h-full'>
                <span className='text-accent-foreground'>Templates</span>
                <div className='flex items-center gap-2 p-3 mt-4 rounded-md border border-dashed border-fuchsia-500/20 bg-fuchsia-900/20 text-fuchsia-400'>
                  <p className='text-sm'>Choose template you like most</p>
                </div>
                <div className='mt-6 flex flex-col gap-2'>
                  <div className='border border-gray-400 w-full rounded-md p-2'>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nulla quam
                      exercitationem possimus deleniti voluptas ad eius consequatur rerum minima qui
                      magni recusandae cumque, perspiciatis exceptur
                    </p>
                  </div>
                  <div className='border w-full rounded-md p-2'>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nulla quam
                      exercitationem possimus deleniti voluptas ad eius consequatur rerum minima qui
                      magni recusandae cumque, perspiciatis exceptur
                    </p>
                  </div>
                  <div className='border w-full rounded-md p-2'>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nulla quam
                      exercitationem possimus deleniti voluptas ad eius consequatur rerum minima qui
                      magni recusandae cumque, perspiciatis exceptur
                    </p>
                  </div>
                  <div className='border w-full rounded-md p-2'>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nulla quam
                      exercitationem possimus deleniti voluptas ad eius consequatur rerum minima qui
                      magni recusandae cumque, perspiciatis exceptur
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
        <Markdown />
      </div>
    </main>
  )
}
