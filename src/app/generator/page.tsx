import { ReadmeGenerator } from '@/components/readme-generator'
import { Sidebar } from '@/components/sidebar'

export const dynamic = 'force-dynamic'

export default function Generator() {
  return (
    <main className='p-2 min-h-screen'>
      <div className='h-full w-full grid grid-cols-1 md:grid-cols-[300px,_1fr] gap-3'>
        <Sidebar />
        <ReadmeGenerator />
      </div>
    </main>
  )
}
