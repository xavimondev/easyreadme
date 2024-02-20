'use client'

import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import { Drawer } from 'vaul'

type DrawerMobileProps = {
  btnOpen: ReactNode
  title?: string
  description?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DrawerMobile({
  btnOpen,
  open,
  setOpen,
  children
}: PropsWithChildren<DrawerMobileProps>) {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{btnOpen}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/60 dark:bg-background/70 backdrop-blur-sm' />
        <Drawer.Content className='bg-white dark:bg-[#100f11] flex flex-col rounded-t-md h-[80%] mt-24 fixed bottom-0 left-0 right-0'>
          <div className='p-1 rounded-t-md flex-1 overflow-y-auto'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mt-3 mb-6' />
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
