import { GeistSans } from 'geist/font/sans'

import { cn } from '@/lib/utils'

type HeadingHeroProps = {
  title?: string
  textColorTitle?: string
}

export function HeadingHero({ title, textColorTitle }: HeadingHeroProps) {
  return (
    <h1
      key={title}
      className={cn(
        `${GeistSans.className} text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl leading-tight font-semibold text-balance text-transparent bg-clip-text bg-gradient-to-r animate-blurred-fade-in`,
        textColorTitle
      )}
      style={{
        animationDelay: '100ms'
      }}
    >
      {title}
    </h1>
  )
}
