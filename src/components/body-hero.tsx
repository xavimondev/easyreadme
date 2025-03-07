import { MainHero } from '@/components/main-hero'

import { CTAHero } from './cta-hero'

export function BodyHero() {
  return (
    <main className='size-full flex-grow px-8 xl:px-11 sm:max-w-6xl mx-auto text-center flex items-center justify-center'>
      <section className='size-full space-y-6 animate-fade-in'>
        <MainHero />
        <CTAHero />
      </section>
    </main>
  )
}
