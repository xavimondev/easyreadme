import { CounterRemaining } from '@/components/counter-remaining'
import { CreateTemplateButton } from '@/components/create-template-button'
import { Button } from '@/components/ui/button'
import { PlusIc } from '@/components/icons'
import { CustomEditor } from '@/components/editor/custom-editor'

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
        <div className='flex flex-col gap-2 w-full'>
          <div className='w-full flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-gray-900/25 transition-colors duration-150 ease-in-out'>
            <div className='space-y-1'>
              <h2 className='font-bold'>Banner</h2>
              <p className='text-sm text-muted-foreground'>Add beautiful banner to your project.</p>
            </div>
            <Button size='icon'>
              <PlusIc className='w-4 h-4' />
            </Button>
          </div>
          <div className='w-full flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-gray-900/25 transition-colors duration-150 ease-in-out'>
            <div className='space-y-1'>
              <h2 className='font-bold'>Project Summary</h2>
              <p className='text-sm text-muted-foreground'>
                Project Summary for your amazing project.
              </p>
            </div>
            <Button size='icon'>
              <PlusIc className='w-4 h-4' />
            </Button>
          </div>
        </div>
        <CustomEditor />
      </div>
    </>
  )
}
