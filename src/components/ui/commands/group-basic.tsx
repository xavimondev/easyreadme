import { CommandGroup } from 'cmdk'

import { groupBasicItems } from '@/components/editor/custom-extensions/slash-command/blocks'

import { EditorCommandItemMagic } from './editor-command-item'

export function GroupBasicBlock() {
  return (
    <>
      <CommandGroup heading='Basic blocks'>
        {groupBasicItems.map(({ title, command, icon, description }) => (
          <EditorCommandItemMagic
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
          </EditorCommandItemMagic>
        ))}
      </CommandGroup>
    </>
  )
}
