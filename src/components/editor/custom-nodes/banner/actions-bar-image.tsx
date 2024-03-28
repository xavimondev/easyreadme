import { Dispatch, SetStateAction } from 'react'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { FormImageUrl } from './form-image-url'

type ActionsBarImageProps = {
  removeSection: () => void
  imageUrl: string
  setImageUrl: Dispatch<SetStateAction<string>>
}

export function ActionsBarImage({ removeSection, imageUrl, setImageUrl }: ActionsBarImageProps) {
  return (
    <div className='flex gap-2 items-center top-2 right-2 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'>
      <div
        className='z-10 drag-handle cursor-grab rounded-sm size-9 hover:bg-white/10 transition-colors duration-300 ease-in-out'
        contentEditable='false'
        draggable='true'
        data-drag-handle
      />
      <Button
        size='icon'
        className='bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out'
        onClick={removeSection}
      >
        <Trash className='size-4 text-white' />
      </Button>
      <FormImageUrl setImageUrl={setImageUrl} imageUrl={imageUrl} />
    </div>
  )
}
