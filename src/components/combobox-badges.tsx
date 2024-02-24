'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { LIST_BADGES } from '@/badges'
import { Check, ChevronsUpDown } from 'lucide-react'

import { BadgeOption } from '@/types/builder'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type ComboboxBadgesProps = {
  setBadgeOptionData: Dispatch<SetStateAction<BadgeOption>>
}

export function ComboboxBadges({ setBadgeOptionData }: ComboboxBadgesProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('frontend')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {value
            ? LIST_BADGES.find((item) => item.label.toLowerCase() === value)?.label
            : 'Select badge category...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search category...' />
          <CommandEmpty>No badge found.</CommandEmpty>
          <CommandGroup>
            {LIST_BADGES.map(({ id, label, data }) => (
              <CommandItem
                key={id}
                value={label}
                onSelect={(currentValue) => {
                  setValue(currentValue === value.toLowerCase() ? '' : currentValue)
                  setOpen(false)
                  setBadgeOptionData({
                    id,
                    label,
                    data
                  })
                }}
              >
                {label}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === label.toLowerCase() ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
