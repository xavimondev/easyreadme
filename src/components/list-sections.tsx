import { PropsWithChildren } from 'react'
import { Plus } from 'lucide-react'

import { NodeName, Section } from '@/types/builder'

import { useReadme } from '@/hooks/use-readme'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

type SectionItemProps = {
  id: NodeName
  name: string
  description: string
  buildCustomReadme: ({
    section,
    options
  }: {
    section: NodeName
    options?:
      | {
          data: any
        }
      | undefined
  }) => Promise<void>
}

function SectionItem({
  id,
  name,
  description,
  buildCustomReadme,
  children
}: PropsWithChildren<SectionItemProps>) {
  return (
    <div className='flex flex-col gap-2 rounded-lg border p-4'>
      <div className='w-full flex flex-row items-center justify-between gap-0.5'>
        <div className='space-y-1'>
          <h2 className='font-bold'>{name}</h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        {children == null ? (
          <Button
            size='icon'
            className='xl:min-w-9'
            onClick={() => buildCustomReadme({ section: id })}
          >
            <Plus className='w-4 h-4' />
          </Button>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type ListSectionsProps = {
  listSections: Section[]
  customSections: Partial<Record<NodeName, JSX.Element>>
}

export function ListSections({ listSections, customSections }: ListSectionsProps) {
  const { buildCustomReadme } = useReadme()

  return (
    <ScrollArea className='md:h-[calc(100vh-180px)]'>
      <div className='flex flex-col gap-2 w-full overflow-hidden px-3.5'>
        {listSections
          .toSorted((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map((section) => {
            const children = customSections[section.id]
            return (
              <SectionItem key={section.id} {...section} buildCustomReadme={buildCustomReadme}>
                {children}
              </SectionItem>
            )
          })}
      </div>
    </ScrollArea>
  )
}
