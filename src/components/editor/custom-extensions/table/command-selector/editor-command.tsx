import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef } from 'react'

import { Command, CommandList } from '@/components/ui/command'

export const EditorCommand = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Command>>(
  function EditorCommand({ children, className, ...rest }, ref) {
    useEffect(() => {
      const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
      const onKeyDown = (e: KeyboardEvent) => {
        if (navigationKeys.includes(e.key)) {
          e.preventDefault()
          const commandRef = document.querySelector('#table-selector')

          if (commandRef)
            commandRef.dispatchEvent(
              new KeyboardEvent('keydown', { key: e.key, cancelable: true, bubbles: true })
            )

          return false
        }
      }
      document.addEventListener('keydown', onKeyDown)
      return () => {
        document.removeEventListener('keydown', onKeyDown)
      }
    }, [])

    const commandListRef = useRef<HTMLDivElement>(null)

    return (
      <Command
        ref={ref}
        onKeyDown={(e) => {
          e.stopPropagation()
        }}
        id='table-selector'
        className={className}
        {...rest}
      >
        <CommandList ref={commandListRef}>{children}</CommandList>
      </Command>
    )
  }
)
