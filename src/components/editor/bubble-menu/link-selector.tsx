import { useRef } from 'react'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { Check, Link, Trash } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'

export function isValidUrl({ url }: { url: string }) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function getUrlFromString({ str }: { str: string }) {
  if (isValidUrl({ url: str })) return str
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (e) {
    return null
  }
}

export const LinkSelector = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { readmeEditor } = useBuilder()

  if (!readmeEditor) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={cn('rounded-none size-10', {
            'text-purple-400': readmeEditor.isActive('link')
          })}
        >
          <Link className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' side='top' className='w-64 p-1.5' sideOffset={10}>
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement
            e.preventDefault()
            const input = target[0] as HTMLInputElement
            const url = getUrlFromString({ str: input.value })
            url && readmeEditor.chain().focus().setLink({ href: url }).run()
          }}
          className='flex items-center'
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Paste a link'
            className='flex-1 bg-background text-sm outline-none size-full p-1'
            defaultValue={readmeEditor.getAttributes('link').href || ''}
          />
          {readmeEditor.getAttributes('link').href ? (
            <Button
              size='icon'
              variant='outline'
              type='button'
              className='flex items-center size-7 rounded-sm text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800'
              onClick={() => {
                readmeEditor.chain().focus().unsetLink().run()
              }}
            >
              <Trash className='size-4' />
            </Button>
          ) : (
            <Button size='icon' className='size-7'>
              <Check className='size-4' />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  )
}
