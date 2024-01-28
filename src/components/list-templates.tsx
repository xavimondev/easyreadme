'use client'

import { NodeName } from '@/types/builder'
import { Template } from '@/types/readme'

import { LIST_TEMPLATES, README_SECTIONS_DATA } from '@/constants'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { Badge } from '@/components/ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

type TemplateItemProps = {
  template: Template
  buildReadme: ({ data }: { data: NodeName | NodeName[] }) => Promise<void>
}
export function TemplateItem({ template, buildReadme }: TemplateItemProps) {
  const { nameTemplate, sections, description } = template
  const templateSelected = useBuilder((state) => state.templateSelected)
  const setTemplateSelected = useBuilder((state) => state.setTemplateSelected)
  const isSelected = templateSelected === nameTemplate

  return (
    <HoverCard openDelay={100} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            'w-full rounded-md flex flex-col items-start gap-3 border p-3 text-left transition-all hover:bg-accent cursor-pointer',
            isSelected && 'bg-muted'
          )}
          onClick={() => {
            buildReadme({
              data: sections!
            })
            setTemplateSelected(nameTemplate)
          }}
        >
          <div className='flex items-center'>
            <div className='flex items-center gap-2'>
              <h2 className='font-semibold'>{nameTemplate}</h2>
            </div>
          </div>
          <div className='line-clamp-2 text-sm text-muted-foreground'>{description}</div>
          <div className='flex items-center gap-2 text-xs'>
            <Badge variant='default'>API</Badge>
            <Badge variant='secondary'>Backend</Badge>
            <Badge variant='outline'>Backend</Badge>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className='w-80 min-w-[450px] h-full' align='start' side='right'>
        <div className='flex flex-col gap-4'>
          {sections && sections.length > 0 && (
            <div className='flex flex-col gap-2'>
              <h3 className='font-medium'>Sections</h3>
              <ul className='text-sm list-disc list-inside space-y-1'>
                {sections.map((section) => {
                  const sectionName = README_SECTIONS_DATA.find((sec) => sec.id === section)
                  return (
                    <li key={section} className='text-muted-foreground'>
                      {sectionName?.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

type ListTemplatesProps = {
  buildReadme: ({ data }: { data: NodeName | NodeName[] }) => Promise<void>
}

export function ListTemplates({ buildReadme }: ListTemplatesProps) {
  return (
    <div className='flex flex-col gap-3'>
      {LIST_TEMPLATES.map((template: Template) => (
        <TemplateItem key={template.nameTemplate} template={template} buildReadme={buildReadme} />
      ))}
    </div>
  )
}
