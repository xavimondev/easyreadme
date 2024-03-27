import { cn } from '@/lib/utils'
import { StickerHero } from '@/components/sticker-hero'

const LIST_STICKERS = [
  {
    urlSticker: '/emojis/ai.webp',
    className: 'top-[0rem] xl:-top-[3.5rem] md:right-[3rem] xl:right-[8.5rem]',
    delay: 1
  },
  {
    urlSticker: '/emojis/clipboard.webp',
    className: 'top-[0rem] xl:-top-[3.5rem] md:left-[3rem] xl:left-[8.5rem]',
    delay: 1.3
  },
  {
    urlSticker: '/emojis/rocket.webp',
    className: 'top-[5rem] xl:top-[5rem] md:right-[2rem] xl:right-[4rem]',
    delay: 1.6
  },
  {
    urlSticker: '/emojis/wrench.webp',
    className: 'top-[5rem] xl:top-[5rem] left-8 xl:left-[4rem]',
    delay: 1.9
  },
  {
    urlSticker: '/emojis/key.webp',
    className: 'top-[10rem] xl:top-[14rem] right-8 xl:right-10',
    delay: 2.1
  },
  {
    urlSticker: '/emojis/antenna.webp',
    className: 'top-[10rem] xl:top-[14rem] left-8 xl:left-10',
    delay: 2.4
  }
]

export function ListStickers() {
  return (
    <>
      <div className='hidden lg:block'>
        {LIST_STICKERS.map(({ urlSticker, className, delay }, index) => {
          return (
            <StickerHero
              delay={delay}
              key={index}
              urlSticker={urlSticker}
              className={cn(className)}
            />
          )
        })}
      </div>
    </>
  )
}
