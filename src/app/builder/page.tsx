import { BuilderSections } from '@/components/builder-sections'
import { CommandCenter } from '@/components/command-center'
import { Header } from '@/components/header'
import { ViewCodeButton } from '@/components/view-code-button'

export default function Builder() {
  return (
    <div className='p-2 min-h-screen'>
      <Header>
        <div className='flex pb-2 items-center justify-between'>
          MiLog
          <CommandCenter />
          <ViewCodeButton />
        </div>
      </Header>
      <BuilderSections />
    </div>
  )
}
