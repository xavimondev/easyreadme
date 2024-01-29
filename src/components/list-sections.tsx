import { PropsWithChildren } from 'react'
import { Plus, Trash } from 'lucide-react'

import { NodeName, SectionState } from '@/types/builder'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

type SectionItemProps = {
  name: string
  description: string
  added: boolean
  buildReadme?: VoidFunction
}

function SectionItem({
  name,
  description,
  added,
  buildReadme,
  children
}: PropsWithChildren<SectionItemProps>) {
  return (
    <div className='flex flex-col gap-2 rounded-lg border p-4'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='font-bold'>{name}</h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        {children == null ? (
          <Button size='icon' onClick={buildReadme}>
            {added ? <Trash className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
          </Button>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type ListSectionsProps = {
  listSections: SectionState[]
  customSections: Partial<Record<NodeName, JSX.Element>>
  buildReadme: ({ data }: { data: NodeName | NodeName[] }) => Promise<void>
}

export function ListSections({ listSections, customSections, buildReadme }: ListSectionsProps) {
  return (
    <ScrollArea className='md:h-[calc(100vh-172px)]'>
      <div className='flex flex-col gap-2 w-full overflow-hidden px-3.5'>
        {listSections
          .toSorted((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map(({ id, name, description, added }) => {
            const children = customSections[id]
            return (
              <SectionItem
                key={id}
                name={name}
                added={added}
                description={description}
                buildReadme={() => buildReadme({ data: id })}
              >
                {children}
              </SectionItem>
            )
          })}
      </div>
    </ScrollArea>
  )
}
