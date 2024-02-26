'use client'

import { LIST_TEMPLATES } from '@/templates'

import { NodeName } from '@/types/builder'
import { Template } from '@/types/readme'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { useReadme } from '@/hooks/use-readme'
import { Badge } from '@/components/ui/badge'

type TemplateItemProps = {
  template: Template
  buildTemplate: ({ sections }: { sections?: NodeName[] }) => Promise<void>
}

export function TemplateItem({ template, buildTemplate }: TemplateItemProps) {
  const { nameTemplate, description, tags } = template
  const templateSelected = useBuilder((state) => state.templateSelected)
  const setTemplateSelected = useBuilder((state) => state.setTemplateSelected)
  const isSelected = templateSelected === nameTemplate
  const sections = LIST_TEMPLATES.find(
    ({ nameTemplate }) => nameTemplate === template.nameTemplate
  )!.sections

  return (
    <div
      className={cn(
        'w-full rounded-md flex flex-col items-start gap-3 border p-3 text-left transition-all hover:bg-accent cursor-pointer',
        isSelected && 'bg-muted'
      )}
      onClick={async () => {
        setTemplateSelected(nameTemplate)
        await buildTemplate({ sections })
      }}
    >
      <div className='flex items-center'>
        <div className='flex items-center gap-2'>
          <h2 className='font-semibold'>{nameTemplate}</h2>
        </div>
      </div>
      <div className='line-clamp-2 text-sm text-muted-foreground'>{description}</div>
      <div className='flex items-center gap-2 text-xs'>
        {tags.map((tag) => {
          return (
            <Badge key={tag} variant='secondary'>
              {tag}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

type ListTemplatesProps = {
  mobileCloseFunction?: VoidFunction
}

export function ListTemplates({ mobileCloseFunction }: ListTemplatesProps) {
  const { buildTemplate } = useReadme()

  const buildTemplateHandle = async ({ sections }: { sections?: NodeName[] }) => {
    await buildTemplate({ sections })

    mobileCloseFunction && mobileCloseFunction()
  }

  return (
    <div className='flex flex-col gap-3 px-3.5'>
      {LIST_TEMPLATES.map((template: Template) => (
        <TemplateItem
          key={template.nameTemplate}
          template={template}
          buildTemplate={buildTemplateHandle}
        />
      ))}
    </div>
  )
}
