import { ReadmeBuilder } from '@/components/readme-builder'
import { Sidebar } from '@/components/sidebar'

export default function Builder() {
  return (
    <main className='p-4 min-h-screen'>
      <div className='h-full w-full flex gap-2'>
        <Sidebar />
        <ReadmeBuilder />
      </div>
    </main>
  )
}
