'use client'

import { useMemo, useState } from 'react'

import { NodeName } from '@/types/builder'

import { useBuilder } from '@/store'
import { useReadme } from '@/hooks/use-readme'
import { CustomEditor } from '@/components/editor/custom-editor'
import { Sidebar } from '@/components/sidebar'

import { BadgesOptions } from './badges-options'
import { ContributorsOptions } from './contributors-options'

export function BuilderSections() {
  const [filterSection, setFilterSection] = useState('')
  const { listSections } = useBuilder((store) => store)
  const { editor, buildReadme } = useReadme()

  const customSections: Partial<Record<NodeName, JSX.Element>> = useMemo(() => {
    return {
      [NodeName.BADGE]: <BadgesOptions buildReadme={buildReadme} />,
      [NodeName.CONTRIBUTORS]: <ContributorsOptions buildReadme={buildReadme} />
    }
  }, [editor])

  const listSectionsFiltered = useMemo(() => {
    return filterSection !== '' && filterSection.length > 0
      ? listSections.filter((section) =>
          section.name.toLowerCase().includes(filterSection.toLowerCase())
        )
      : listSections
  }, [filterSection, listSections])

  return (
    <main className='h-full w-full grid grid-cols-1 md:grid-cols-[450px,_1fr]'>
      <Sidebar
        setFilterSection={setFilterSection}
        customSections={customSections}
        listSectionsFiltered={listSectionsFiltered}
        buildReadme={buildReadme}
      />
      <CustomEditor editor={editor} />
    </main>
  )
}
