'use client'
import { useRef } from 'react'

export function Stars() {
  const widthRef = useRef(window.innerWidth)
  const countStars = Math.floor(widthRef.current / 10) - 2

  return (
    <>
      {Array.from({ length: countStars }, (_, index) => {
        const left = index * 10
        const delay = Math.floor(Math.random() * 1000)
        const extraTop = Math.floor(Math.random() * 600)
        const dimension = Math.random() * 4
        return (
          <div
            key={index}
            className='
              bg-gradient-to-tr 
              from-red-600 
              to-yellow-700 
              dark:from-[#FFFAA7] 
              dark:to-[#f4ab19] 
              rounded-full 
              absolute 
              animate-enter-in-view 
              [animation-timeline:scroll()] 
              supports-no-scroll-driven-animations:animate-none
              opacity-0'
            style={{
              width: `${dimension.toFixed(2)}px`,
              height: `${dimension.toFixed(2)}px`,
              animationDelay: `${delay}ms`,
              top: `${200 + extraTop}px`,
              left: `${left}px`
            }}
          ></div>
        )
      })}
    </>
  )
}
