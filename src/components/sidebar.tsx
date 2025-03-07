'use client'

import { Dispatch, SetStateAction } from 'react'
import { BrushIcon, LayoutTemplateIcon } from 'lucide-react'

import { NodeName, Section } from '@/types/builder'
import { ModuleType } from '@/types/sidebar'

import { useBuilder } from '@/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContainerTemplates } from '@/components/container-templates'
import { FormGit } from '@/components/form-git'
import { ListSections } from '@/components/list-sections'
import { SectionsSearcher } from '@/components/sections-searcher'
import { TemplatesMobile } from '@/components/templates-mobile'

type SidebarProps = {
  setFilterSection: Dispatch<SetStateAction<string>>
  customSections: Partial<Record<NodeName, JSX.Element>>
  listSectionsFiltered: Section[]
}

export function Sidebar({ setFilterSection, customSections, listSectionsFiltered }: SidebarProps) {
  const setModuleSelected = useBuilder((store) => store.setModuleSelected)

  return (
    <aside className='size-full py-2 border-0 lg:border lg:border-r-0 lg:rounded-l-md border-black dark:border-white/20 mb-1 lg:mb-0'>
      <FormGit />
      <TemplatesMobile />
      <Tabs
        defaultValue='templates'
        onValueChange={(value: string) => setModuleSelected(value as ModuleType)}
        className='hidden lg:block h-[38px]'
      >
        <div className='flex items-center gap-3 px-3.5'>
          <TabsList>
            <TabsTrigger value='templates' className='py-1.5'>
              <LayoutTemplateIcon className='size-4 mr-2' />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value='custom' className='hidden xl:block py-1.5'>
              <div className='flex items-center'>
                <BrushIcon className='size-4 mr-2' />
                <span>Customize</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='templates'>
          <div className='size-full hidden md:block'>
            <ContainerTemplates />
          </div>
        </TabsContent>
        <TabsContent value='custom' className='hidden xl:block'>
          <div className='flex flex-col gap-2'>
            <SectionsSearcher setFilterSection={setFilterSection} />
            <ListSections listSections={listSectionsFiltered} customSections={customSections} />
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
