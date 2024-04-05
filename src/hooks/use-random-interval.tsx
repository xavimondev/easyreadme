import { useCallback, useEffect, useRef } from 'react'
import { random } from '@/utils'

export function useRandomInterval({
  callback,
  minDelay,
  maxDelay
}: {
  callback: () => void
  minDelay: number | null
  maxDelay: number | null
}) {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number'

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random({ min: minDelay, max: maxDelay })
        timeoutId.current = setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }

    return () => clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])

  const cancel = useCallback(function () {
    clearTimeout(timeoutId.current)
  }, [])

  return cancel
}
