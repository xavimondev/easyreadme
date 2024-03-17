import Image from 'next/image'

import { BuilderSections } from '@/components/builder-sections'
import { CommandCenter } from '@/components/command-center'
import { Header } from '@/components/header'
import { ViewCodeButton } from '@/components/view-code-button'

export default function Builder() {
  return (
    <div className='p-2 min-h-screen'>
      <Header>
        <div className='flex flex-col sm:flex-row pb-2 sm:items-center sm:justify-between gap-2 sm:gap-0 w-full'>
          <div className='hidden sm:flex items-center cursor-pointer text-white'>
            <Image src='/extension_icon.png' alt='Application logo' width={30} height={30} />
            <h1 className='text-lg ml-2 hover:text-violet-200 transition-colors duration-300'>
              easyreadme
            </h1>
          </div>

          <CommandCenter />
          <ViewCodeButton />
        </div>
      </Header>
      <BuilderSections />
    </div>
  )
}
