import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const MotionImage = motion(Image)

type StickerHero = {
  urlSticker: string
  delay: number
}

interface StickerHeroProps extends React.HTMLAttributes<HTMLImageElement>, StickerHero {}

export function StickerHero({ urlSticker, delay, className, ...props }: StickerHeroProps) {
  return (
    <AnimatePresence>
      {urlSticker && (
        <MotionImage
          key={urlSticker}
          src={urlSticker}
          alt='Sticker feature'
          className={cn(
            'hidden md:block absolute object-cover transition-all size-12 md:size-16 2xl:size-24',
            className
          )}
          width={150}
          height={150}
          initial={{
            scale: 0,
            rotate: 5
          }}
          animate={{
            scale: 1
          }}
          transition={{
            delay,
            duration: 0.2
          }}
          whileHover={{
            scale: 1.2,
            rotate: 6
          }}
          drag
        />
      )}
    </AnimatePresence>
  )
}
