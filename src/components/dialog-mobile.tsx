'use client'
import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { NameTemplate } from '@/types'
import { DEFAULT_TEMPLATES } from '@/constants'
import { useTemplate } from '@/store'
import { Button } from '@/components/ui/button'
import { DrawerMobile } from '@/components/ui/drawer-mobile'

export function DialogMobile() {
  const setTemplateSelected = useTemplate((state) => state.setTemplateSelected)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const itemSelectedRef = useRef<string>('')
  const [open, setOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const container = sliderRef.current
    if (!container) return
    const elements = container.getElementsByClassName(
      'slider-item'
    ) as HTMLCollectionOf<HTMLDivElement>
    const itemWidth = elements[0].offsetWidth
    const scrollLeft = container.scrollLeft
    const visibleElementIndex = Math.floor(scrollLeft / itemWidth)
    const nodeSelected = elements[visibleElementIndex].querySelector('h4')
    if (nodeSelected) {
      const elementSelected = nodeSelected.textContent ?? ''
      itemSelectedRef.current = elementSelected
    }
  }, [])

  return (
    <DrawerMobile
      btnOpen={<span className='text-sm text-fuchsia-600 font-medium'>See templates</span>}
      open={open}
      setOpen={setOpen}
    >
      <div className='relative w-full h-full'>
        <div
          className='flex gap-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto scrollbar-hide'
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {DEFAULT_TEMPLATES.map(({ nameTemplate, description, srcImage, altImage }) => {
            return (
              <div
                key={nameTemplate}
                className='flex flex-col gap-6 snap-always snap-center w-full shrink-0 slider-item'
              >
                <div className='flex justify-center'>
                  <Image
                    src={srcImage}
                    alt={altImage}
                    width={300}
                    height={300}
                    className='rounded-md w-full h-full object-cover'
                  />
                </div>
                <h4 className='font-medium leading-none text-4xl text-center'>{nameTemplate}</h4>
                <p className='text-muted-foreground'>{description}</p>
              </div>
            )
          })}
        </div>
        <Button
          variant='default'
          className='absolute bottom-8 w-full'
          onClick={() => {
            setTemplateSelected(itemSelectedRef.current as NameTemplate)
            setOpen(false)
          }}
        >
          Apply
        </Button>
      </div>
    </DrawerMobile>
  )
}
