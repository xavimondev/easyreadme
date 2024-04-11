import { ScrollArea } from '@/components/ui/scroll-area'
import { ListTemplates } from '@/components/list-templates'

export function ContainerTemplates() {
  return (
    <ScrollArea className='lg:h-[calc(100vh-169px)] xl:h-[calc(100vh-177px)] 2xl:h-[calc(100vh-177px)]'>
      <ListTemplates />
    </ScrollArea>
  )
}
