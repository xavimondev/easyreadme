import { useState } from 'react'
import { BadgeName } from '@/types'
import { LIST_BADGES } from '@/constants'
import { PlusIc } from '@/components/icons'
import { Button } from '@/components/ui/button'

type BadgeItemProps = {
  id: BadgeName
  name: string
  color: string
  addSection: ({ section, options }: { section: string; options?: { data: any } }) => void
}

function BadgeItem({ id, name, color, addSection }: BadgeItemProps) {
  return (
    <div className='w-full flex border border-dashed border-gray-600/30 rounded-md items-center overflow-hidden h-8'>
      <div className='w-full border-none flex'>
        <span className='font-medium justify-center text-sm ml-3'>{name}</span>
      </div>
      <Button
        size='icon'
        variant='ghost'
        className='rounded-none h-full border-none p-0 m-0'
        style={{
          backgroundColor: color
        }}
        onClick={() =>
          addSection({
            section: 'badges',
            options: {
              data: { id, color }
            }
          })
        }
      >
        <PlusIc className='w-4 h-4' />
      </Button>
    </div>
  )
}

type ListBadgesProps = {
  color: string
  addSection: ({ section, options }: { section: string; options?: { data: any } }) => void
}

function ListBadges({ color, addSection }: ListBadgesProps) {
  return (
    <div className='w-full grid grid-cols-3 gap-4'>
      {LIST_BADGES.map(({ id, name }) => {
        return <BadgeItem key={id} id={id} name={name} addSection={addSection} color={color} />
      })}
    </div>
  )
}

type SelectBadgesProps = {
  addSection: ({ section, options }: { section: string; options?: { data: any } }) => void
}

export function SelectBadges({ addSection }: SelectBadgesProps) {
  const [color, setColor] = useState('#156634')

  return (
    <div className='flex flex-col gap-6 mt-2'>
      <div className='flex gap-2 items-center'>
        <label className='text-sm font-medium leading-none'>Color for your badge</label>
        <input type='color' name='color' value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <ListBadges addSection={addSection} color={color} />
    </div>
  )
}
