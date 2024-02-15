import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import { Command } from 'cmdk'

export const EditorCommand = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Command>>(
  function EditorCommand({ children, className, ...rest }, ref) {
    useEffect(() => {
      const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
      const onKeyDown = (e: KeyboardEvent) => {
        if (navigationKeys.includes(e.key)) {
          e.preventDefault()
          const commandRef = document.querySelector('#slash-command')

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
        id='slash-command'
        className={className}
        {...rest}
      >
        <Command.List ref={commandListRef}>{children}</Command.List>
      </Command>
    )
  }
)
