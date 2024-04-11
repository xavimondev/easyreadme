import { CommandGroup } from '@/components/ui/command'

import { groupTableItems } from './blocks'
import { CommandSlashItem } from './command-slash-item'

export function GroupTableBlock() {
  return (
    <CommandGroup heading='Table'>
      {groupTableItems.map((item) => (
        <CommandSlashItem
          value={item.title}
          onCommand={(val) => item.command(val)}
          className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent/70 aria-selected:bg-accent/70'
          key={item.title}
        >
          <div className='flex size-10 items-center justify-center rounded-md border border-muted bg-background'>
            {item.icon}
          </div>
          <div>
            <p className='font-medium'>{item.title}</p>
            <p className='text-xs text-muted-foreground'>{item.description}</p>
          </div>
        </CommandSlashItem>
      ))}
    </CommandGroup>
  )
}
