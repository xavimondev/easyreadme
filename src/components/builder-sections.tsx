'use client'

import { useMemo, useState } from 'react'

import { NodeName } from '@/types/builder'

import { useBuilder } from '@/store'
import { BadgesOptions } from '@/components/badges-options'
import { ReadmeEditor } from '@/components/editor/readme-editor'
import { Sidebar } from '@/components/sidebar'
import { TemplatesMobile } from '@/components/templates-mobile'

export function BuilderSections() {
  const [filterSection, setFilterSection] = useState('')
  const listSections = useBuilder((store) => store.listSections)

  const customSections: Partial<Record<NodeName, JSX.Element>> = useMemo(() => {
    return {
      [NodeName.BADGE]: <BadgesOptions />
    }
  }, [])

  const listSectionsFiltered = useMemo(() => {
    return filterSection !== '' && filterSection.length > 0
      ? listSections.filter((section) =>
          section.name.toLowerCase().includes(filterSection.toLowerCase())
        )
      : listSections
  }, [filterSection, listSections])

  return (
    <main className='size-full grid lg:grid-cols-[400px,_1fr] 2xl:grid-cols-[450px,_1fr]'>
      <TemplatesMobile />
      <Sidebar
        setFilterSection={setFilterSection}
        customSections={customSections}
        listSectionsFiltered={listSectionsFiltered}
      />
      <ReadmeEditor />
    </main>
  )
}
