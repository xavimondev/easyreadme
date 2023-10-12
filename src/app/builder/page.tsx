import { ReadmeBuilder } from '@/components/readme-builder'
import { Sidebar } from '@/components/sidebar'

export const dynamic = 'force-dynamic'

export default function Builder() {
  return (
    <main className='p-2 min-h-screen'>
      <div className='h-full w-full grid grid-cols-1 md:grid-cols-[300px,_1fr] gap-3'>
        <Sidebar />
        <ReadmeBuilder />
      </div>
    </main>
  )
}
