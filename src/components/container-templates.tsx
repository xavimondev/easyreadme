import { ScrollArea } from '@/components/ui/scroll-area'
import { ListTemplates } from '@/components/list-templates'

export function ContainerTemplates() {
  return (
    <ScrollArea className='lg:h-[calc(100vh-140px)] xl:h-[calc(100vh-143px)] 2xl:h-[calc(100vh-148px)]'>
      <ListTemplates />
    </ScrollArea>
  )
}
