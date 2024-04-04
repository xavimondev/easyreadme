'use client'

import Link from 'next/link'

import { useBuilder } from '@/store'
import { HeadingHero } from '@/components/heading-hero'

export function Hero() {
  const featureSelected = useBuilder((store) => store.featureSelected)
  const { title, description, textColorTitle } = featureSelected ?? {}

  return (
    <div className='w-full lg:w-3/4 flex flex-col justify-start'>
      <HeadingHero title={title} textColorTitle={textColorTitle} />
      <p
        className='text-gray-500 dark:text-gray-300/90 text-base md:text-lg xl:text-xl text-pretty mt-2 sm:mt-12 animate-fade-in max-w-5xl'
        style={{ animationDelay: '300ms' }}
      >
        {featureSelected
          ? description
          : 'Generate visually stunning READMEs with AI and elegant pre-designed templates.'}
      </p>
      <div className='pt-8 lg:pt-10'>
        <Link
          className='py-4 px-6 bg-[#27263b] dark:hover:bg-[#1a172a] text-zinc-300 hover:bg-primary/90 rounded-xl text-sm sm:text-base 2xl:text-xl font-medium transition-colors animate-fade-in'
          style={{ animationDelay: '400ms' }}
          href='/builder'
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
