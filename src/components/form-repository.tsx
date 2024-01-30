'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Command } from 'lucide-react'
import { toast } from 'sonner'

import { isValidGitHubRepositoryURL } from '@/utils/github'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { useKeyPress } from '@/hooks/use-keypress'
import useLocalStorage from '@/hooks/use-local-storage'
import { Input } from '@/components/ui/input'
import { GitIc } from '@/components/icons'

const LIST_ITEMS = [
  {
    id: 0,
    name: 'https://google.com.pe'
  },
  {
    id: 1,
    name: 'https://twitchtv.com'
  },
  {
    id: 2,
    name: 'https://github.com'
  }
]

export function FormRepository() {
  // FIXME: Maybe this is not necessary anymore because there's a global state
  const [inputValue, setInputValue] = useState('')
  const [listRepositories, setListRepositories] = useState(LIST_ITEMS)
  const [cursor, setCursor] = useState<number>(0)
  const setGitUrlRepository = useBuilder((store) => store.setGitUrlRepository)
  // const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const downPress = useKeyPress('ArrowDown', inputRef)
  const upPress = useKeyPress('ArrowUp', inputRef)
  const enterPress = useKeyPress('Enter', inputRef)
  const { content, setValue } = useLocalStorage<Array<string>>('repositories', [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (content.length && downPress) {
      setCursor((prevState) => (prevState < content.length - 1 ? prevState + 1 : 0))
    }
  }, [downPress, content])

  useEffect(() => {
    if (content.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : content.length - 1))
    }
  }, [upPress])

  useEffect(() => {
    if (content.length > 0 && enterPress) {
      setInputValue(content[cursor])
      // FIXME: Close command bar when an option is pressed
    }
  }, [cursor, enterPress])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlRepository = inputValue
    const listRepositories = content

    if (!isValidGitHubRepositoryURL({ url: urlRepository })) {
      toast.error('Invalid GitHub URL')
      return
    }

    // Saving in localstorage
    let data = undefined
    if (listRepositories.length <= 4) {
      data = listRepositories.concat(urlRepository)
    } else {
      data = listRepositories.slice(1).concat(urlRepository)
    }
    setValue(data)
    setGitUrlRepository(urlRepository)
  }

  const listRepositoriesFiltered = useMemo(() => {
    return inputValue.trim().length > 0
      ? content.filter((repository) => repository.toLowerCase().includes(inputValue.toLowerCase()))
      : content
  }, [inputValue, content])

  return (
    <div className='flex flex-col relative z-10 group'>
      <form className='flex gap-2' onSubmit={handleSubmit}>
        <div className='relative flex w-[500px] items-center border group-focus-within:border-neutral-600 rounded-md group-focus-within:rounded-b-none bg-neutral-800/60 focus-within:bg-transparent transition-colors duration-200'>
          <div className='flex items-center pointer-events-none absolute inset-y-0 group-focus-within:left-0 left-[90px] pl-0 group-focus-within:pl-3 text-black/50 dark:text-white/40'>
            <GitIc className='w-4 h-4' />
          </div>
          <Input
            type='url'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            required
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            name='urlRepository'
            value={inputValue}
            className='w-full h-8 pl-9 border-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-center text-center group-focus-within:placeholder:text-left group-focus-within:text-left group-focus-within:placeholder:text-white/60 placeholder:text-white/40'
            placeholder='https://github.com/xavimondev/easyreadme'
          />
          {/* {inputValue.length > 0 ? (
            <span
              className='group-focus-within:flex items-center absolute inset-y-0 right-0 pr-2 hidden text-black/50 dark:text-white/40 focus:outline-none focus:ring-1 focus:ring-neutral-500'
              onClick={() => setInputValue('')}
            >
              <X className='w-4 h-4' />
            </span>
          ) : null} */}
          <div className='flex gap-1 items-center pointer-events-none absolute inset-y-0 right-0 pr-2 group-focus-within:hidden text-black/50 dark:text-white/40'>
            <Command className='w-4 h-4' />
            <span>K</span>
          </div>
        </div>
      </form>
      <div className='absolute z-10 top-[2.10rem] hidden group-focus-within:block w-full border border-neutral-600 rounded-b-md group-focus-within:border-t-0 bg-neutral-950 shadow-lg'>
        {listRepositoriesFiltered.length > 0 ? (
          <ul className='text-white/50 text-sm'>
            {listRepositoriesFiltered.map((item, i) => {
              return (
                <li
                  key={item}
                  className={cn(
                    'px-4 py-2 hover:bg-neutral-800 hover:text-white/80 cursor-pointer',
                    {
                      'bg-neutral-800 text-white/80': i === cursor
                    }
                  )}
                  onClick={() => setInputValue(item)}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        ) : (
          <span className='block p-1 text-sm text-white/50 text-center'>No repositories found</span>
        )}
      </div>
    </div>
  )
}
