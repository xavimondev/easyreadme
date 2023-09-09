'use client'
import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { GitIc } from '@/components/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Markdown } from '@/components/markdown'
import { Button } from '@/components/ui/button'

export default function Builder() {
  return (
    <main className='p-4 min-h-screen'>
      <div className='h-full w-full flex gap-2'>
        <ScrollArea className='max-w-[350px] h-[calc(100vh-35px)]'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Source</CardTitle>
            </CardHeader>
            <CardContent>
              <form className='flex flex-col gap-2'>
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
                <Button variant='secondary' type='submit'>
                  Sent
                </Button>
              </form>
              <div className='mt-7 w-full h-full'>
                <span className='text-accent-foreground'>Templates</span>
                <div className='mt-6 flex flex-col gap-2'>
                  <div className='border-2 border-fuchsia-600 w-full rounded-md overflow-hidden'>
                    <picture>
                      <Image
                        src='/templates/t_boostgrammar.webp'
                        alt='Animation of Boostgrammar README'
                        width={400}
                        height={400}
                        className='w-full h-full object-cover'
                      />
                    </picture>
                  </div>
                  <div className='w-full rounded-md overflow-hidden'>
                    <picture>
                      <Image
                        src='/templates/t_projecthac.webp'
                        alt='Screenshot Project Hackaton README'
                        width={400}
                        height={400}
                        className='w-full h-full object-cover'
                      />
                    </picture>
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
