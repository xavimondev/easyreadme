import { BuilderSections } from '@/components/builder-sections'
import { CounterRemaining } from '@/components/counter-remaining'
import { CreateTemplateButton } from '@/components/create-template-button'
import { Header } from '@/components/header'

export default function Builder() {
  return (
    <>
      <Header>
        <div className='flex h-12 items-center justify-between'>
          MiLog
          <div className='flex gap-2 items-center w-[300px]'>
            <CounterRemaining />
            <CreateTemplateButton />
          </div>
        </div>
      </Header>
      <BuilderSections />
    </>
  )
}
