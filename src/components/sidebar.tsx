import { Dispatch, SetStateAction } from 'react'

import { NodeName, SectionState } from '@/types/builder'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListSections } from '@/components/list-sections'
import { ListTemplates } from '@/components/list-templates'
import { Searcher } from '@/components/searcher'

type SidebarProps = {
  setFilterSection: Dispatch<SetStateAction<string>>
  customSections: Partial<Record<NodeName, JSX.Element>>
  listSectionsFiltered: SectionState[]
  buildReadme: ({ data }: { data: NodeName | NodeName[] }) => Promise<void>
}

export function Sidebar({
  setFilterSection,
  customSections,
  listSectionsFiltered,
  buildReadme
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
          <div className='w-full h-full hidden md:block'>
            <p className='text-muted-foreground text-sm mt-4 mb-5'>
              A simple text explaining the porpuse of templates
            </p>
            <ListTemplates buildReadme={buildReadme} />
            <Separator className='my-6' />
          </div>
        </TabsContent>
        <TabsContent value='custom'>
          <div className='flex flex-col gap-2'>
            <Searcher setFilterSection={setFilterSection} />
            <ListSections
              listSections={listSectionsFiltered}
              customSections={customSections}
              buildReadme={buildReadme}
            />
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
