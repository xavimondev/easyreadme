import { SectionKey } from '@/types'

type ContributorsOptionsProps = {
  addSection: ({ section, options }: { section: SectionKey; options?: { data: any } }) => void
}

export function ContributorsOptions({ addSection }: ContributorsOptionsProps) {
  return (
    <div className='flex gap-10 mt-2'>
      <div
        className='flex flex-col gap-2 border border-white/20 rounded-md p-3 cursor-pointer'
        onClick={() =>
          addSection({
            section: 'badges',
            options: {
              data: 'gallery'
            }
          })
        }
      >
        <div className='flex gap-1'>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
          <div className='rounded-full bg-slate-600 h-7 w-7'></div>
        </div>
        <span className='text-sm font-medium text-gray-100 dark:text-gray-400 text-center'>
          Gallery
        </span>
      </div>
      <div
        className='flex flex-col gap-2 border-2 border-white/75 rounded-md p-3 cursor-pointer'
        onClick={() =>
          addSection({
            section: 'badges',
            options: {
              data: 'table'
            }
          })
        }
      >
        <div className='flex gap-1'>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
        </div>
        <div className='flex gap-1'>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
          <div className='rounded-md bg-slate-600 h-7 w-7'></div>
        </div>
        <span className='text-sm font-medium text-gray-100 dark:text-gray-400 text-center'>
          Table
        </span>
      </div>
    </div>
  )
}
