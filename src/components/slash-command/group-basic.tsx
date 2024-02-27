import { CommandGroup } from '@/components/ui/command'

import { groupBasicItems } from './blocks'
import { CommandSlashItem } from './command-slash-item'

export function GroupBasicBlock() {
  return (
    <>
      <CommandGroup heading='Basic blocks'>
        {groupBasicItems.map(({ title, command, icon, description }) => (
          <CommandSlashItem
            value={title}
            onCommand={(val) => command(val)}
            className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent/70 aria-selected:bg-accent/70'
            key={title}
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
              {icon}
            </div>
            <div>
              <p className='font-medium'>{title}</p>
              <p className='text-xs text-muted-foreground'>{description}</p>
            </div>
          </CommandSlashItem>
        ))}
      </CommandGroup>
    </>
  )
}
