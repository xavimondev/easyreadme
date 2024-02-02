import { Dispatch, SetStateAction } from 'react'

import { NodeName, SectionState } from '@/types/builder'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CounterRemaining } from '@/components/counter-remaining'
import { ListSections } from '@/components/list-sections'
import { ListTemplates } from '@/components/list-templates'
import { Searcher } from '@/components/searcher'

type SidebarProps = {
  setFilterSection: Dispatch<SetStateAction<string>>
  customSections: Partial<Record<NodeName, JSX.Element>>
  listSectionsFiltered: SectionState[]
}

export function Sidebar({ setFilterSection, customSections, listSectionsFiltered }: SidebarProps) {
  return (
    <aside className='w-full h-full py-2 border border-r-0 rounded-l-md border-black dark:border-white/20'>
      <Tabs defaultValue='templates'>
        <div className='flex items-center gap-3 px-3.5'>
          <TabsList className='ml-auto'>
            <TabsTrigger value='templates'>Templates</TabsTrigger>
            <TabsTrigger value='custom'>
              <div className='flex items-center gap-1'>
                Customize{' '}
                <Badge className='border bg-purple-900/80 hover:bg-purple-800 transition-colors duration-200 text-white text-xs dark:text-purple-100'>
                  New
                </Badge>
              </div>
            </TabsTrigger>
          </TabsList>
          <CounterRemaining />
        </div>
        <TabsContent value='templates'>
          <div className='w-full h-full hidden md:block'>
            <ListTemplates />
          </div>
        </TabsContent>
        <TabsContent value='custom'>
          <div className='flex flex-col gap-2'>
            <Searcher setFilterSection={setFilterSection} />
            <ListSections listSections={listSectionsFiltered} customSections={customSections} />
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
