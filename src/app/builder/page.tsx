import { CounterRemaining } from '@/components/counter-remaining'
import { CreateTemplateButton } from '@/components/create-template-button'
import { CustomEditor } from '@/components/editor/custom-editor'
import { ListSections } from '@/components/list-sections'

export default function Generator() {
  return (
    <>
      <header className='border-b mx-2'>
        <div className='flex h-12 items-center justify-between'>
          MiLog
          <div className='flex gap-2 items-center w-[300px]'>
            <CounterRemaining />
            <CreateTemplateButton />
          </div>
        </div>
      </header>
      <div className='h-full w-full grid grid-cols-1 md:grid-cols-[500px,_1fr] gap-3 mt-4 mx-2'>
        <ListSections />
        <CustomEditor />
      </div>
    </>
  )
}
