import { Button } from '@/components/ui/button'
import { PlusIc } from '@/components/icons'

export function CreateTemplateButton() {
  return (
    <Button className='w-full h-8 p-2'>
      <PlusIc className='w-5 h-5' />
      New Template
    </Button>
  )
}
