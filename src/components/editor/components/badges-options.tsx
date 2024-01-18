import { BadgeName, NodeName } from '@/types'
import { LIST_BADGES } from '@/constants'
import { PlusIc } from '@/components/icons'
import { Button } from '@/components/ui/button'

type BadgeItemProps = {
  id: BadgeName
  name: string
  addSection: ({ section, options }: { section: NodeName; options?: { data: any } }) => void
}

function BadgeItem({ id, name, addSection }: BadgeItemProps) {
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
          addSection({
            section: NodeName.BADGE,
            options: {
              data: { id }
            }
          })
        }
      >
        <PlusIc className='w-4 h-4' />
      </Button>
    </div>
  )
}

type BadgesOptionsProps = {
  addSection: ({ section, options }: { section: NodeName; options?: { data: any } }) => void
}

export function BadgesOptions({ addSection }: BadgesOptionsProps) {
  return (
    <div className='w-full grid grid-cols-3 gap-4'>
      {LIST_BADGES.map(({ id, name }) => {
        return <BadgeItem key={id} id={id} name={name} addSection={addSection} />
      })}
    </div>
  )
}
