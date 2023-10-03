'use client'
import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_TEMPLATES, README_SECTIONS } from '@/constants'
import { Template } from '@/types'
import { cn } from '@/lib/utils'
import { useTemplate } from '@/store'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export function TemplateItem({
  srcImage,
  altImage,
  nameTemplate,
  authorTemplate,
  urlAuthor,
  sections,
  description
}: Template) {
  const templateSelected = useTemplate((state) => state.templateSelected)
  const setTemplateSelected = useTemplate((state) => state.setTemplateSelected)
  const isSelected = templateSelected === nameTemplate

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div
          className='w-full rounded-md overflow-hidden cursor-pointer'
          onClick={() => setTemplateSelected(nameTemplate)}
        >
          <figure>
            <Image
              src={srcImage}
              alt={altImage}
              width={500}
              height={500}
              priority={nameTemplate === 'Minimal'}
              className={cn('w-full h-[220px] rounded-md object-cover', {
                'border border-sky-600': isSelected
              })}
            />
            <figcaption
              className={cn('text-sm text-gray-400 mt-2 text-center italic', {
                'text-sky-600': isSelected
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
      <HoverCardContent className='w-80 min-h-[100px]' align='start' side='right'>
        <div className='flex flex-col gap-4'>
          <h4 className='font-medium leading-none'>{nameTemplate}</h4>
          <p className='text-sm text-muted-foreground'>{description}</p>
          {sections && sections.length > 0 && (
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Sections({sections.length}):</span>
              <ul className='text-sm list-disc list-inside space-y-1'>
                {sections.map((section) => {
                  const sectionName = README_SECTIONS[section]
                  return (
                    <li key={section} className='text-muted-foreground'>
                      {sectionName}
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

export function ListTemplates() {
  return (
    <div className='flex flex-col gap-6'>
      {DEFAULT_TEMPLATES.map((template: Template) => (
        <TemplateItem key={template.nameTemplate} {...template} />
      ))}
    </div>
  )
}
