'use client'

import { ReactNode, useState } from 'react'
import { range } from '@/utils'

import { generateSparkle } from '@/utils/generateSparkle'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { useRandomInterval } from '@/hooks/use-random-interval'
import { SparkleItem } from '@/components/sparkle-item'

export function Sparkles({ color, children }: { color: string; children: ReactNode }) {
  const [sparkles, setSparkles] = useState(() => {
    return range({ start: 4, step: 1 }).map(() => generateSparkle({ color }))
  })

  const prefersReducedMotion = usePrefersReducedMotion()

  useRandomInterval({
    callback: () => {
      const sparkle = generateSparkle({ color })
      const now = Date.now()
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt
        return delta < 700
      })

      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    minDelay: prefersReducedMotion ? null : 80,
    maxDelay: prefersReducedMotion ? null : 1100
  })

  return (
    <span className='relative inline-block'>
      {sparkles.map(({ id, color, size, style }) => (
        <SparkleItem key={id} color={color} size={size} style={style} />
      ))}
      <strong className='relative z-[1px]'>{children}</strong>
    </span>
  )
}
