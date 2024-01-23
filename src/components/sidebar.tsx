import { Dispatch, SetStateAction } from 'react'

import { NodeName, SectionState } from '@/types/builder'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListSections } from '@/components/list-sections'
import { ListTemplates } from '@/components/list-templates'
import { Searcher } from '@/components/searcher'

type SidebarProps = {
  setFilterSection: Dispatch<SetStateAction<string>>
  customSections: Partial<Record<NodeName, JSX.Element>>
  listSectionsFiltered: SectionState[]
  addSection: ({
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

export function Sidebar({
  setFilterSection,
  customSections,
  listSectionsFiltered,
  addSection
}: SidebarProps) {
  return (
    <aside className='h-full md:h-[calc(100vh-18px)]'>
      <Tabs defaultValue='templates' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='templates'>Templates</TabsTrigger>
          <TabsTrigger value='custom'>
            <div className='flex items-center gap-2'>
              Customize{' '}
              <Badge className='border bg-purple-900/80 hover:bg-purple-800 transition-colors duration-200'>
                <span className='text-white dark:text-purple-100'>New</span>
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='templates'>
          <div className='w-full h-full mt-4 hidden md:block'>
            <h3 className='text-black/40 dark:text-white/50 mb-4 font-semibold text-sm sm:text-lg'>
              Templates
            </h3>
            <ListTemplates />
          </div>
        </TabsContent>
        <TabsContent value='custom'>
          <div className='flex flex-col gap-2'>
            <Searcher setFilterSection={setFilterSection} />
            <ListSections
              listSections={listSectionsFiltered}
              customSections={customSections}
              addSection={addSection}
            />
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
