import { Button } from '@/components/ui/button'
import { PlusIc } from '@/components/icons'

type SectionItemProps = {
  name: string
  description: string
}

function SectionItem({ name, description }: SectionItemProps) {
  return (
    <div className='w-full flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-gray-900/25 transition-colors duration-150 ease-in-out'>
      <div className='space-y-1'>
        <h2 className='font-bold'>{name}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Button size='icon'>
        <PlusIc className='w-4 h-4' />
      </Button>
    </div>
  )
}
export function ListSections() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <SectionItem name='Banner' description='Add a beautiful banner to your project.' />
    </div>
  )
}
