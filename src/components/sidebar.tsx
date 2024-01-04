import { ListTemplates } from '@/components/list-templates'
import { FormRepository } from '@/components/form-repository'
import { ColumnsIc } from '@/components/icons'
import { TemplatesMobile } from '@/components/templates-mobile'
import { CounterRemaining } from '@/components/counter-remaining'

export function Sidebar() {
  return (
    <aside className='h-full md:h-[calc(100vh-18px)] w-full'>
      <div className='w-full h-full rounded-md border border-black dark:border-gray-300/20 bg-card text-card-foreground md:overflow-y-auto md:scrollbar-hide p-2.5 md:px-4 md:py-0'>
        <div className='md:sticky z-10 md:pt-3 md:pb-4 flex flex-col gap-4 bg-white dark:bg-[#09090B] md:top-0'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1.5'>
              <ColumnsIc className='w-5 h-5' />
              <h2 className='text-black dark:text-white font-semibold text-base sm:text-xl'>
                Generator
              </h2>
            </div>
            <CounterRemaining />
          </div>
          <FormRepository />
        </div>
        <TemplatesMobile />
        <div className='w-full h-full mt-4 hidden md:block'>
          <h3 className='text-black/40 dark:text-white/50 mb-4 font-semibold text-sm sm:text-lg'>
            Templates
          </h3>
          <ListTemplates />
        </div>
      </div>
    </aside>
  )
}
