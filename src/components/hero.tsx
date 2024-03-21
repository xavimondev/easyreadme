'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'

export function Hero() {
  const featureSelected = useBuilder((store) => store.featureSelected)
  const { title, description, textColorTitle, urlSticker, shadowColor } = featureSelected ?? {}

  return (
    <div className='w-full flex flex-col justify-center animate-fade-in animate-delay-100 gap-8 relative'>
      {urlSticker && (
        <Image
          src={urlSticker}
          alt='This a image'
          className={cn(
            'hidden lg:block size-36 xl:size-56 absolute top-2 xl:-top-2 right-8 xl:right-5 rotate-6 hover:scale-105 object-cover transition-all hover:drop-shadow-[0_0_15px_rgba(194,187,61,1)]',
            shadowColor
          )}
          width={150}
          height={150}
        />
      )}
      <h1
        className={cn(
          ' text-5xl sm:text-6xl 2xl:text-[5rem] leading-tight font-semibold text-balance capitalize text-transparent bg-clip-text bg-gradient-to-r',
          textColorTitle
            ? textColorTitle
            : 'from-blue-600 to-violet-700 dark:from-orange-200 dark:to-violet-800'
        )}
      >
        {featureSelected ? title : 'Craft Stunning READMEs Effortlessly'}
      </h1>
      <p className='text-gray-500 dark:text-gray-300/90 text-base sm:text-lg 2xl:text-xl text-pretty mt-12'>
        {featureSelected
          ? description
          : 'Generate visually stunning READMEs with AI and elegant pre-designed templates. Generate visually stunning READMEs with AI and elegant pre-designed templates. AI and elegant pre-designed templates.'}
      </p>
      <div className='mt-8 lg:mt-10'>
        <Link
          className='py-4 px-6 bg-[#201D2F] hover:bg-[#262237] text-zinc-300 hover:bg-primary/90 inline-flex items-center justify-center rounded-xl text-sm sm:text-base 2xl:text-xl font-medium transition-colors'
          href='/builder'
        >
          Get Started
          <MoveRight className='ml-2 size-4 lg:size-6' />
        </Link>
      </div>
    </div>
  )
}
