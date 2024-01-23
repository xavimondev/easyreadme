import { BuilderSections } from '@/components/builder-sections'
import { CounterRemaining } from '@/components/counter-remaining'
import { Header } from '@/components/header'
import { ViewCodeButton } from '@/components/view-code-button'

export default function Builder() {
  return (
    <>
      <Header>
        <div className='flex h-12 items-center justify-between'>
          MiLog
          <div className='flex gap-2 items-center w-[300px]'>
            <CounterRemaining />
            <ViewCodeButton />
          </div>
        </div>
      </Header>
      <BuilderSections />
    </>
  )
}
