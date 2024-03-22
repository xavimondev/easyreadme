import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const MotionImage = motion(Image)

type StickerHero = {
  urlSticker?: string
}

interface StickerHeroProps extends React.HTMLAttributes<HTMLImageElement>, StickerHero {}

export function StickerHero({ urlSticker, className, ...props }: StickerHeroProps) {
  return (
    <AnimatePresence>
      {urlSticker && (
        <MotionImage
          key={urlSticker}
          src={urlSticker}
          alt='Sticker feature'
          className={cn(
            'hidden md:block absolute object-cover transition-all size-24 md:size-32 xl:size-48',
            className
          )}
          width={200}
          height={200}
          initial={{
            scale: 0,
            rotate: 5
          }}
          animate={{
            scale: 1
          }}
          transition={{
            delay: 0,
            duration: 0.2
          }}
          whileHover={{
            scale: 1.2,
            rotate: 6
          }}
          drag
          // {...props}
          // dragConstraints={{
          //   top: -50,
          //   left: -50,
          //   right: 100,
          //   bottom: 100
          // }}
        />
      )}
    </AnimatePresence>
  )
}
