import { EditorCommand } from './editor-command'
import { EditorCommandItem } from './editor-command-item'
import { suggestions } from './suggestions'

export function CommandSelector() {
  return (
    <EditorCommand className='z-50 h-auto max-h-[200px] w-56 overflow-y-auto rounded-md border border-muted bg-background p-2 shadow-md transition-all'>
      {suggestions
        .filter((i) => i.type === 'col')
        .map(({ title, command, icon }) => (
          <EditorCommandItem
            value={title}
            onCommand={(val) => command(val)}
            className='flex w-full items-center gap-1 py-1 rounded-md text-left text-sm hover:bg-accent/70 aria-selected:bg-accent/70 h-8'
            key={title}
          >
            <div className='flex size-6 items-center justify-center'>{icon}</div>
            <div>
              <p className='text-sm font-medium'>{title}</p>
            </div>
          </EditorCommandItem>
        ))}
    </EditorCommand>
  )
}
