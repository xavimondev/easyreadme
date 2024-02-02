import { Plus } from 'lucide-react'

import { BadgeName, NodeName } from '@/types/builder'

import { LIST_BADGES } from '@/constants'
import { useReadme } from '@/hooks/use-readme'
import { Button } from '@/components/ui/button'

type BadgeItemProps = {
  id: BadgeName
  name: string
}

function BadgeItem({ id, name }: BadgeItemProps) {
  const { buildCustomReadme } = useReadme()

  return (
    <div className='w-full flex border border-dashed border-gray-600/30 rounded-md items-center overflow-hidden h-8'>
      <div className='w-full border-none flex'>
        <span className='font-medium justify-center text-[0.77rem] ml-2'>{name}</span>
      </div>
      <Button
        size='icon'
        variant='ghost'
        className='rounded-none h-full border-none p-0 m-0'
        onClick={() =>
          buildCustomReadme({
            section: NodeName.BADGE,
            options: {
              data: { id }
            }
          })
        }
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  )
}

export function BadgesOptions() {
  return (
    <div className='w-full grid grid-cols-3 gap-4'>
      {LIST_BADGES.map(({ id, name }) => {
        return <BadgeItem key={id} id={id} name={name} />
      })}
    </div>
  )
}
