import { ListTemplates } from '@/components/list-templates'
import { FormRepository } from '@/components/form-repository'
import { ColumnsIc } from '@/components/icons'

export function Sidebar() {
  return (
    <aside className='h-[calc(100vh-18px)] w-full'>
      <div className='w-full h-full rounded-md border bg-card text-card-foreground overflow-y-auto scrollbar-hide px-2'>
        <div className='sticky z-10 pt-3 pb-4 flex flex-col gap-4 bg-white dark:bg-[#09090B] top-0'>
          <div className='flex items-center gap-1.5'>
            <ColumnsIc className='w-5 h-5' />
            <h2 className='text-black dark:text-white font-semibold text-base sm:text-xl'>
              Builder
            </h2>
          </div>
          <FormRepository />
        </div>
        <div className='w-full h-full mt-4'>
          <h3 className='text-black/40 dark:text-white/50 mb-4 font-semibold text-sm sm:text-lg'>
            Templates
          </h3>
          <ListTemplates />
        </div>
      </div>
    </aside>
  )
}
