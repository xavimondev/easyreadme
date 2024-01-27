'use client'

import Image from 'next/image'
import Link from 'next/link'

import { NodeName } from '@/types/builder'
import { Template } from '@/types/readme'

import { LIST_TEMPLATES, README_SECTIONS_DATA } from '@/constants'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

type TemplateItemProps = {
  template: Template
  buildReadme: ({ data }: { data: NodeName | NodeName[] }) => Promise<void>
}
export function TemplateItem({ template, buildReadme }: TemplateItemProps) {
  const { srcImage, altImage, nameTemplate, authorTemplate, urlAuthor, sections, description } =
    template
  const templateSelected = useBuilder((state) => state.templateSelected)
  const setTemplateSelected = useBuilder((state) => state.setTemplateSelected)
  const isSelected = templateSelected === nameTemplate

  return (
    <HoverCard openDelay={100} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div
          className='w-full rounded-md overflow-hidden cursor-pointer'
          onClick={() => {
            buildReadme({
              data: sections!
            })
            setTemplateSelected(nameTemplate)
          }}
        >
          <figure>
            <Image
              src={srcImage}
              alt={altImage}
              width={500}
              height={500}
              className={cn(
                'w-full h-full rounded-md object-cover border border-gray-300 dark:border-none',
                {
                  'border-2 border-purple-600': isSelected
                }
              )}
            />
            <figcaption
              className={cn('text-gray-400 text-sm mt-2 text-center italic font-semibold', {
                'text-purple-500': isSelected
              })}
            >
              {nameTemplate}
              {authorTemplate && urlAuthor && (
                <>
                  by{' '}
                  <Link href={urlAuthor} className='underline underline-offset-1'>
                    {authorTemplate}
                  </Link>
                </>
              )}
            </figcaption>
          </figure>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className='w-80 min-w-[450px] h-full' align='start' side='right'>
        <div className='flex flex-col gap-4'>
          <h4 className='font-medium leading-none'>{nameTemplate}</h4>
          <p className='text-sm text-muted-foreground'>{description}</p>
          {sections && sections.length > 0 && (
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Sections({sections.length}):</span>
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
    <div className='grid sm:grid-cols-2 grid-cols-1 gap-x-2 gap-y-5'>
      {LIST_TEMPLATES.map((template: Template) => (
        <TemplateItem key={template.nameTemplate} template={template} buildReadme={buildReadme} />
      ))}
    </div>
  )
}
