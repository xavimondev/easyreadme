import { SlidersHorizontal } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { DialogMobile } from '@/components/dialog-mobile'

export function TemplatesMobile() {
  return (
    <div className='w-full block lg:hidden bg-neutral-900/35 border mb-3 rounded-md'>
      <div className='flex space-x-4 px-2.5 pt-2.5'>
        <SlidersHorizontal className='size-5 mt-[3px]' />
        <div className='space-y-1'>
          <p className='font-medium'>Templates</p>
          <p className='text-sm text-muted-foreground'>
            Discover a variety of README templates tailored for different projects and purposes.
          </p>
        </div>
      </div>
      <div className='pl-[37px] pb-2'>
        <Separator className='my-2 w-full' />
        <DialogMobile />
      </div>
    </div>
  )
}
