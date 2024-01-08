import { RemoveIc } from '@/components/icons'
import { Button } from '@/components/ui/button'

export function ActionsBar({ removeSection }: any) {
  return (
    <div className='flex gap-2 items-center top-0 right-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'>
      <div
        className='z-10 drag-handle cursor-grab rounded-sm w-9 h-9 hover:bg-white/5 transition-colors duration-300 ease-in-out'
        contentEditable='false'
        draggable='true'
        data-drag-handle
      />
      <Button
        size='icon'
        className='bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out'
        onClick={removeSection}
      >
        <RemoveIc className='w-4 h-4 text-white' />
      </Button>
    </div>
  )
}