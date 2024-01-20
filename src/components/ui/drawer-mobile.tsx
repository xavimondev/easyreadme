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
  title,
  description,
  open,
  setOpen,
  children
}: PropsWithChildren<DrawerMobileProps>) {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{btnOpen}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/60 dark:bg-background/70 backdrop-blur-sm' />
        <Drawer.Content className='bg-white dark:bg-[#161518] flex flex-col rounded-t-[10px] h-[95%] mt-24 fixed bottom-0 left-0 right-0'>
          <div className='p-4 rounded-t-[10px] flex-1'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-6' />
            <div className='max-w-md mx-auto h-full'>
              {title && (
                <Drawer.Title className='text-black dark:text-white font-medium mb-4'>
                  {title}
                </Drawer.Title>
              )}
              {description && (
                <Drawer.Description className='text-sm text-muted-foreground mb-4'>
                  {description}
                </Drawer.Description>
              )}
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
