import Link from 'next/link'
import { PenLine } from 'lucide-react'

import { AppLogo } from '@/components/app-logo'
import { Hero } from '@/components/hero'
import { GitIc } from '@/components/icons'
import { ListFeatures } from '@/components/list-features'
import { Sparkles } from '@/components/sparkles'

export default function Home() {
  return (
    <>
      <div className='absolute size-full bg-transparent'>
        <div className='size-full bg-[radial-gradient(#101010_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>
      </div>
      <div className='h-screen flex flex-col'>
        <header className='sticky top-0 px-8 xl:px-20 py-2 w-full'>
          <div className='flex h-14 items-center justify-between'>
            <div className='hidden sm:flex items-center cursor-pointer text-white'>
              <AppLogo />
            </div>
            <div className='flex gap-2 items-center justify-between w-full sm:w-auto'>
              <Link
                className='flex px-4 py-2 bg-[#171524] dark:hover:bg-[#27263b] text-zinc-300 hover:bg-primary/90 rounded-md font-medium transition-colors animate-fade-in text-sm border'
                href='/builder'
              >
                <PenLine className='size-5 mr-2' />
                <span>Build a Readme</span>
              </Link>
              <a
                aria-label='View app repository on GitHub'
                href='https://github.com/xavimondev/easyreadme'
                target='_blank'
                rel='noreferrer'
                className='rounded-md p-2.5 hover:bg-accent transition-colors duration-300 z-10 bg-[#171524] dark:hover:bg-[#27263b]'
              >
                <GitIc className='size-5 bg-transparent' />
              </a>
            </div>
          </div>
        </header>
        <main className='size-full flex px-8 xl:px-11 sm:max-w-5xl mx-auto mt-20 sm:mt-48'>
          <section className='size-full flex flex-col gap-10'>
            <ListFeatures />
            <Hero />
          </section>
        </main>
        <footer className='w-full flex items-center justify-center px-8 xl:px-20 py-2'>
          <span className='text-purple-100 text-base'>
            Built with 💜 by{' '}
            <Sparkles color='#FFC700'>
              <a
                href='https://twitter.com/xavimonp'
                rel='noopener'
                target='_blank'
                className='underline underline-offset-4'
              >
                xavimon
              </a>
            </Sparkles>
          </span>
        </footer>
      </div>
    </>
  )
}
