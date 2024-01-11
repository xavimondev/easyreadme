'use client'
import { PropsWithChildren, useMemo } from 'react'
import { SectionKey } from '@/types'
import { useBuilder } from '@/store'
import { Button } from '@/components/ui/button'
import { CheckIc, PlusIc } from '@/components/icons'
import { BadgesOptions } from '@/components/editor/components/badges-options'
import { ContributorsOptions } from '@/components/editor/components/contributors-options'

type SectionItemProps = {
  name: string
  description: string
  added: boolean
  addSection?: VoidFunction
}

function SectionItem({
  name,
  description,
  added,
  addSection,
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
          <Button size='icon' onClick={addSection}>
            {added ? <CheckIc className='w-4 h-4' /> : <PlusIc className='w-4 h-4' />}
          </Button>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type ListSectionsProps = {
  addSection: ({ section, options }: { section: SectionKey; options?: { data: any } }) => void
}

export function ListSections({ addSection }: ListSectionsProps) {
  const sections = useBuilder((store) => store.listSections)
  const customSections: Partial<Record<SectionKey, JSX.Element>> = useMemo(() => {
    return {
      badges: <BadgesOptions addSection={addSection} />,
      contributors: <ContributorsOptions addSection={addSection} />
    }
  }, [])

  return (
    <div className='flex flex-col gap-2 w-full'>
      {sections
        .toSorted((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .map(({ id, name, description, added }) => {
          const children = customSections[id]
          return (
            <SectionItem
              key={id}
              name={name}
              added={added}
              description={description}
              addSection={() => addSection({ section: id })}
            >
              {children}
            </SectionItem>
          )
        })}
    </div>
  )
}
