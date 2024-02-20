'use client'

import { Dispatch, SetStateAction } from 'react'

import { NodeName, SectionState } from '@/types/builder'
import { ModuleType } from '@/types/sidebar'

import { useBuilder } from '@/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContainerTemplates } from '@/components/container-templates'
import { CounterRemaining } from '@/components/counter-remaining'
import { ListSections } from '@/components/list-sections'
import { Searcher } from '@/components/searcher'

type SidebarProps = {
  setFilterSection: Dispatch<SetStateAction<string>>
  customSections: Partial<Record<NodeName, JSX.Element>>
  listSectionsFiltered: SectionState[]
}

export function Sidebar({ setFilterSection, customSections, listSectionsFiltered }: SidebarProps) {
  const setModuleSelected = useBuilder((store) => store.setModuleSelected)

  return (
    <aside className='w-full h-full py-2 border border-r-0 rounded-l-md border-black dark:border-white/20 hidden lg:block'>
      <Tabs
        defaultValue='templates'
        onValueChange={(value: string) => setModuleSelected(value as ModuleType)}
      >
        <div className='flex items-center gap-3 px-3.5'>
          <TabsList className='ml-auto'>
            <TabsTrigger value='templates'>Templates</TabsTrigger>
            <TabsTrigger value='custom' className='hidden xl:block'>
              <div className='flex items-center gap-1'>Customize</div>
            </TabsTrigger>
          </TabsList>
          <CounterRemaining />
        </div>
        <TabsContent value='templates'>
          <div className='w-full h-full hidden md:block'>
            <ContainerTemplates />
          </div>
        </TabsContent>
        <TabsContent value='custom' className='hidden xl:block'>
          <div className='flex flex-col gap-2'>
            <Searcher setFilterSection={setFilterSection} />
            <ListSections listSections={listSectionsFiltered} customSections={customSections} />
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
