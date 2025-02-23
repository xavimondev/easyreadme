import { cn } from '@/lib/utils'
import { BodyHero } from '@/components/body-hero'
import { FooterHero } from '@/components/footer-hero'
import { HeaderHero } from '@/components/header-hero'

import { bricolageGrotesque } from './fonts'

export default function Home() {
  return (
    <>
      <div className={cn('min-h-screen flex flex-col bg-[#0a0911]', bricolageGrotesque.className)}>
        <HeaderHero />
        <BodyHero />
        <FooterHero />
      </div>
    </>
  )
}
