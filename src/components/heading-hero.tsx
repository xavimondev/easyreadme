import { cn } from '@/lib/utils'

type HeadingHeroProps = {
  title?: string
  textColorTitle?: string
}

const DEFAULT_HEADING = 'Craft Stunning READMEs Effortlessly'

export function HeadingHero({ title, textColorTitle }: HeadingHeroProps) {
  return (
    <h1
      key={title}
      className={cn(
        'text-4xl sm:text-6xl lg:text-[5rem] 2xl:text-[7rem] leading-tight font-semibold text-balance capitalize text-transparent bg-clip-text bg-gradient-to-r animate-blurred-fade-in',
        textColorTitle
          ? textColorTitle
          : 'from-blue-600 to-violet-700 dark:from-orange-200 dark:to-violet-800'
      )}
      style={{
        animationDelay: '100ms'
      }}
    >
      {title ? title : DEFAULT_HEADING}
    </h1>
  )
}
