import { BuilderSections } from '@/components/builder-sections'
import { CommandCenter } from '@/components/command-center'
import { Header } from '@/components/header'
import { ViewCodeButton } from '@/components/view-code-button'

export default function Builder() {
  return (
    <div className='p-2 min-h-screen'>
      <Header>
        <div className='flex flex-col sm:flex-row pb-2 sm:items-center sm:justify-between gap-2 sm:gap-0 w-full'>
          <span className='hidden sm:block'>LOG</span>
          <CommandCenter />
          <ViewCodeButton />
        </div>
      </Header>
      <BuilderSections />
    </div>
  )
}
