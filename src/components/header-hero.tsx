import { AppLogo } from './app-logo'
import { GitIc } from './icons'

export function HeaderHero() {
  return (
    <header className='sticky top-0 px-8 xl:px-20 py-2 w-full'>
      <div className='flex h-10 items-center justify-between'>
        <div className='hidden sm:flex items-center cursor-pointer text-white'>
          <AppLogo />
        </div>
        <div className='flex gap-2 items-center justify-between w-full sm:w-auto'>
          <a
            aria-label='View app repository on GitHub'
            href='https://github.com/xavimondev/easyreadme'
            target='_blank'
            rel='noreferrer'
            className='rounded-md p-2.5 hover:bg-accent transition-colors duration-300 z-10 dark:hover:bg-[#27263b]'
          >
            <GitIc className='size-5 bg-transparent' />
          </a>
        </div>
      </div>
    </header>
  )
}
