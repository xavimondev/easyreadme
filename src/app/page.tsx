import Link from 'next/link'
import { ChevronRightIc, CopyWithGradientIc, GitHubOctopusIc } from '@/components/icons'
import { ImageTheme } from '@/components/image-theme'
import { ModeToggle } from '@/components/mode-toggle'
import { Stars } from '@/components/stars'

export default function Home() {
  return (
    <>
      <header className='sticky top-0 px-5 md:px-32 backdrop-blur-md border-b border-gray-700 border-opacity-50 dark:border-opacity-20 z-20'>
        <div className='flex h-14 items-center justify-between'>
          <Link
            href='/'
            className='text-base sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'
          >
            easyreadme
          </Link>
          <div className='flex gap-2 items-center'>
            <Link
              href='https://github.com/xavimondev/readme-creator'
              aria-label='Go to Repository'
              target='_blank'
              rel='noreferrer'
              className='rounded-md p-2.5 hover:bg-accent transition-colors ease-out'
            >
              <GitHubOctopusIc className='h-4 w-4 text-black dark:text-white' />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main>
        <section className='flex items-center relative mt-16 lg:mt-0 sm:mb-0 overflow-x-hidden overflow-y-hidden lg:h-screen'>
          <div className='px-5 md:px-32 w-full sm:max-w-4xl flex flex-col gap-10 animate-delay-100 animate-fade-in text-left'>
            <h1 className='text-black dark:text-white text-3xl lg:text-6xl !leading-tight font-semibold'>
              Craft{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'>
                Stunning{' '}
              </span>
              READMEs{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'>
                Effortlessly
              </span>
            </h1>
            <p className='text-gray-500 dark:text-gray-300/90 text-base sm:text-2xl'>
              Generate visually stunning READMEs effortlessly with the help of{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'>
                IA and elegant pre-designed templates.
              </span>
            </p>
            <Link
              className='w-32
              h-10 
              shadow-[0_6px_12px_rgba(0,0,0,.2)] 
              dark:shadow-[0_6px_12px_rgba(255,255,255,.2)] 
              bg-primary 
              text-primary-foreground 
              hover:bg-primary/90 
              inline-flex 
              items-center 
              justify-center 
              rounded-md 
              text-sm 
              font-medium 
              transition-colors'
              href='/builder'
            >
              Get Started
              <ChevronRightIc className='h-4 w-4 sm:h-4 sm:w-4' />
            </Link>
          </div>
          <div
            aria-hidden='true'
            className='absolute w-1/2 sm:h-[32rem] top-0 sm:top-52 right-0 sm:-right-32 opacity-50 backdrop-blur blur-3xl z-0 hidden sm:block'
          >
            <div className='relative'>
              <div className='rounded-full h-52 sm:h-[32rem] w-full bg-red-800 dark:bg-red-300'></div>
              <div className='absolute top-32 left-0 sm:left-24 rounded-full h-48 sm:h-[32rem] w-full bg-blue-800 dark:bg-blue-600'></div>
            </div>
          </div>
          <ImageTheme />
        </section>
        <section className='hidden sm:block sm:h-[200vh]'>
          <div className='sm:sticky sm:top-0 sm:h-screen'>
            <Stars />
            <div className='mx-auto w-full sm:max-w-5xl px-4 sm:px-6 lg:px-8 flex h-full items-center justify-center relative'>
              <h2
                className='text-center 
                text-2xl 
                sm:text-6xl 
                font-semibold 
                !leading-tight 
                text-transparent 
                bg-clip-text 
                bg-gradient-to-tr 
                from-red-500 
                to-yellow-500 
                dark:from-[#FFFAA7] 
                dark:to-[#f4ab19] 
                animate-increase-text 
                supports-no-scroll-driven-animations:animate-none 
                [animation-timeline:\-\-quote] 
                [view-timeline-name:\-\-quote] 
                [animation-range:0%_50%]
                z-50'
              >
                Say goodbye to the hours spent wrestling with READMEs.
              </h2>
            </div>
          </div>
        </section>
        <section className='relative mt-36 sm:mt-0'>
          <div
            aria-hidden='true'
            className='absolute overflow-hidden pointer-events-none top-0 right-5 opacity-50 backdrop-blur blur-3xl'
          >
            <div className='rounded-full h-20 w-20 sm:h-52 dark:h-44 sm:w-52 bg-sky-600 dark:bg-sky-500'></div>
          </div>
          <div
            aria-hidden='true'
            className='absolute overflow-hidden pointer-events-none bottom-24 left-5 opacity-50 backdrop-blur blur-3xl hidden sm:block'
          >
            <div className='rounded-full h-52 dark:h-44 w-32 bg-orange-600 dark:bg-orange-500'></div>
          </div>
          <div className='mx-auto w-full md:max-w-3xl lg:max-w-4xl mt-28 px-5 md:px-0'>
            <div className='sm:flex flex-col gap-6 text-center'>
              <h2 className='text-2xl sm:text-4xl leading-tight font-semibold'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 dark:via-sky-400 dark:to-blue-400'>
                  Edge Streaming, AI, Copy-Paste
                </span>
              </h2>
              <p className='text-base sm:text-2xl text-gray-500 dark:text-white/80 mt-5'>
                Generate READMEs with instant streaming, templates, and effortless copy-paste
                functionality. Your projects, brilliantly documented.
              </p>
            </div>
            <div className='mt-11 lg:mt-16 w-full flex flex-col lg:flex-row gap-5 z-[9999px]'>
              <div
                className='flex-1 
              border 
              rounded-lg 
              flex 
              sm:flex-col 
              sm:justify-end 
              lg:justify-start 
              dark:bg-black/30 
              dark:border-gray-500/20 
              relative 
              overflow-hidden'
              >
                <div className='px-9 py-8 mr-8 w-full lg:max-w-[330px]'>
                  <h3 className='mt-4 text-lg sm:text-4xl sm:leading-tight text-transparent bg-clip-text bg-gradient-to-tr from-yellow-500 to-orange-500 dark:from-[#fffbab] dark:to-[#b59501]'>
                    seamless experience with streaming
                  </h3>
                  <p className='mt-4 sm:mt-10 lg:-mr-16'>
                    Edge Streaming feature delivers dynamic data to users immediately, without the
                    need to wait for it.
                  </p>
                </div>
                <div className='border overflow-hidden rounded-md w-full hidden lg:block absolute -bottom-1 left-7 sm:max-w-sm'>
                  <video autoPlay muted loop>
                    <source
                      src='https://res.cloudinary.com/xavimon/video/upload/v1697152335/easyreadme/streaming_n3dvyl.mp4'
                      type='video/webm'
                    />
                  </video>
                </div>
              </div>
              <div className='lg:flex-1 flex flex-col sm:flex-row lg:flex-col gap-5'>
                <div className='flex-1 p-9 border rounded-lg flex flex-col justify-end dark:bg-black/30 dark:border-gray-500/20 relative overflow-hidden'>
                  <div className='w-full h-full absolute -top-10 sm:top-0 -right-2 sm:right-0 bg-circles'></div>
                  <h4 className='mt-12 sm:mt-20 font-bold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-tr from-green-500 to-teal-300 dark:from-[#a5e29c] dark:to-[#1b7b2c]'>
                    Let AI handle the complexity
                  </h4>
                  <p className='mt-2'>
                    Stop wasting time writing complex sections, empower your documentation with the
                    brilliance of AI.
                  </p>
                </div>
                <div className='flex-1 p-9 border rounded-lg flex flex-col dark:bg-black/30 dark:border-gray-500/20'>
                  <div className='w-full flex justify-center'>
                    <CopyWithGradientIc className='w-12 h-12 sm:w-[70px] sm:h-[70px]' />
                  </div>
                  <h4 className='mt-4 sm:mt-6 font-bold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-red-500'>
                    Copy-Paste ease
                  </h4>
                  <p className='mt-2'>
                    Copying code and sections is a breeze. Effortlessly paste polished, professional
                    content into your projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t border-gray-700 border-opacity-50 dark:border-opacity-20 mt-16'>
        <div className='mx-auto sm:max-w-7xl text-center py-5 px-6 sm:px-0'>
          <span className='text-gray-500 dark:text-white/80 text-base sm:text-lg'>
            Built by
            <a
              href='https://twitter.com/xavimonp'
              rel='noopener'
              target='_blank'
              className='underline underline-offset-4'
            >
              {' '}
              xavimon
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}
