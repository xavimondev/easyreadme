import { CounterRemaining } from '@/components/counter-remaining'
import { CreateTemplateButton } from '@/components/create-template-button'

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
    </>
  )
}
