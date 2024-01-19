import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CreateTemplateButton() {
  return (
    <Button className='w-full h-8 p-2'>
      <Plus className='w-5 h-5' />
      New Template
    </Button>
  )
}
