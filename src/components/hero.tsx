'use client'

import { useBuilder } from '@/store'
import { HeadingHero } from '@/components/heading-hero'

export function Hero() {
  const featureSelected = useBuilder((store) => store.featureSelected)
  const { description, textColorTitle } = featureSelected ?? {}

  return (
    <div className='w-full'>
      <HeadingHero title={description} textColorTitle={textColorTitle} />
    </div>
  )
}
