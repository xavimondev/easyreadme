'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { LIST_TEMPLATES } from '@/templates'

import { NodeName } from '@/types/builder'
import { NameTemplate, Template } from '@/types/readme'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { Badge } from '@/components/ui/badge'

type TemplateItemProps = {
  template: Template
  buildTemplate: () => Promise<void>
  isSelected: boolean
  setTemplateSelected: Dispatch<SetStateAction<NameTemplate>>
}

export function TemplateItem({ template, isSelected, setTemplateSelected }: TemplateItemProps) {
  const { setSectionsFromTemplates } = useBuilder()
  const { nameTemplate, description, tags } = template
  const sections = LIST_TEMPLATES.find(
    ({ nameTemplate }) => nameTemplate === template.nameTemplate
  )!.sections as NodeName[]

  return (
    <div
      className={cn(
        'w-full rounded-md flex flex-col items-start gap-3 border p-3 text-left transition-all hover:bg-accent cursor-pointer',
        isSelected && 'bg-muted'
      )}
      onClick={async () => {
        setTemplateSelected(nameTemplate)
        setSectionsFromTemplates(sections)
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
  const [templateSelected, setTemplateSelected] = useState<NameTemplate>('Minimal')

  const buildTemplateHandle = async () => {
    mobileCloseFunction && mobileCloseFunction()
  }

  return (
    <div className='flex flex-col gap-3 px-3.5'>
      {LIST_TEMPLATES.map((template: Template) => (
        <TemplateItem
          key={template.nameTemplate}
          template={template}
          buildTemplate={buildTemplateHandle}
          isSelected={templateSelected === template.nameTemplate}
          setTemplateSelected={setTemplateSelected}
        />
      ))}
    </div>
  )
}
