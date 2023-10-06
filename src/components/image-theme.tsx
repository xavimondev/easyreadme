'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const IMAGES_PATHS = {
  dark: '/hero/builder_dark.webp',
  light: '/hero/builder_light.webp'
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
    <Image
      src={srcImage}
      alt={`Screenshot application mode ${theme}`}
      width={3000}
      height={1800}
      className='border 
      border-gray-500/50 
      rounded-md 
      shadow-md 
      object-cover 
      object-center 
      w-full 
      h-full 
      absolute 
      lg:left-[75%] 
      xl:left-[65%] 
      2xl:left-[60%] 
      md:w-[900px] 
      md:h-[50vh] 
      lg:h-[50vh]
      xl:w-[1000px] 
      xl:h-[60vh]
      2xl:w-[1300px] 
      2xl:h-[75vh] 
      hidden 
      lg:block 
      animate-slideInRight'
    />
  )
}
