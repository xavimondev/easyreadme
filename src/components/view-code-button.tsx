import { Code2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ViewCodeButton() {
  return (
    <Button className='p-2'>
      <Code2 className='w-5 h-5 mr-1' />
      Code
    </Button>
  )
}
