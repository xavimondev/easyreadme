'use client'

import { useState } from 'react'

import { DrawerMobile } from '@/components/ui/drawer-mobile'
import { ListTemplates } from '@/components/list-templates'

export function DialogMobile() {
  const [open, setOpen] = useState(false)

  return (
    <DrawerMobile
      btnOpen={<span className='text-sm text-purple-300 font-medium'>See templates</span>}
      open={open}
      setOpen={setOpen}
    >
      <div className='size-full flex-1'>
        <ListTemplates mobileCloseFunction={() => setOpen(false)} />
      </div>
    </DrawerMobile>
  )
}
