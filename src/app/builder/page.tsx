import { AppLogo } from '@/components/app-logo'
import { BuilderSections } from '@/components/builder-sections'
import { CopyCodeButton } from '@/components/copy-code-button'
import { GenerationInfo } from '@/components/generation-info'
import { Header } from '@/components/header'

export default function Builder() {
  return (
    <div className='p-2 min-h-screen'>
      <Header>
        <div className='flex flex-col sm:flex-row pb-2 sm:items-center sm:justify-between gap-2 sm:gap-0 w-full'>
          <div className='hidden sm:flex items-center cursor-pointer text-white'>
            <AppLogo />
          </div>
          <div className='flex gap-2 w-full sm:max-w-80'>
            <GenerationInfo />
            <CopyCodeButton />
          </div>
        </div>
      </Header>
      <BuilderSections />
    </div>
  )
}
