'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const IMAGES_PATHS = {
  dark: '/hero/easyreadme-dark.webp',
  light: '/hero/easyreadme-light.webp'
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
    <div className='relative w-full xl:h-[770px] xl:w-[1200px] z-10 overflow-hidden rounded-xl border p-[1px] backdrop-blur-3xl animate-fade-in'>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex h-full w-full items-center justify-center rounded-xl backdrop-blur-3xl overflow-hidden aspect-auto'>
        <Image
          src={srcImage}
          alt={`Screenshot application mode ${theme}`}
          width={2390}
          height={1550}
          priority
          className='border border-gray-500/50 rounded-md object-cover object-center w-full h-full'
        />
      </div>
    </div>
  )
}
