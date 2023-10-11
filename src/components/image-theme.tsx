'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const IMAGES_PATHS = {
  dark: '/hero/dark-builder.webp',
  light: '/hero/light-builder.webp'
}

export function ImageTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme() as {
    theme: 'light' | 'dark'
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const srcImage =
    IMAGES_PATHS[theme] ??
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  return (
    <div className='w-full lg:h-[775px] lg:w-[1195px] absolute lg:left-[75%] xl:left-[65%] 2xl:left-[55%] hidden lg:block animate-slide-in-right'>
      <Image
        src={srcImage}
        alt={`Screenshot application mode ${theme}`}
        width={1195}
        height={775}
        priority
        className='border border-gray-500/50 rounded-md object-cover object-center w-full h-full'
      />
    </div>
  )
}
