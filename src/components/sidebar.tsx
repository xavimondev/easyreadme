import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ListTemplates } from '@/components/list-templates'
import { FormRepository } from '@/components/form-repository'

export function Sidebar() {
  return (
    <div className='w-[350px] max-w-sm h-[calc(100vh-35px)] overflow-y-auto scrollbar-hide'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Source</CardTitle>
        </CardHeader>
        <CardContent>
          <FormRepository />
          <div className='mt-7 w-full h-full'>
            <span className='text-accent-foreground'>Templates</span>
            <ListTemplates />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
