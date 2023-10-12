'use client'
import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_TEMPLATES, README_SECTIONS } from '@/constants'
import { Template } from '@/types'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export function TemplateItem({
  srcImage,
  altImage,
  nameTemplate,
  authorTemplate,
  urlAuthor,
  sections,
  description,
  srcVideo
}: Template) {
  const templateSelected = useBuilder((state) => state.templateSelected)
  const setTemplateSelected = useBuilder((state) => state.setTemplateSelected)
  const isSelected = templateSelected === nameTemplate

  return (
    <HoverCard openDelay={200} closeDelay={0}>
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
              className={cn(
                'w-full h-[220px] rounded-md object-cover border border-gray-300 dark:border-none',
                {
                  'border-2 border-sky-600': isSelected
                }
              )}
            />
            <figcaption
              className={cn('text-gray-400 mt-2 text-center italic font-semibold', {
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
      <HoverCardContent className='w-80 min-w-[450px] h-full' align='start' side='right'>
        <div className='overflow-hidden w-full h-full mb-2'>
          <video
            controls
            muted
            poster='/video-fallback.webp'
            controlsList='nofullscreen nodownload noremoteplayback noplaybackrate foobar'
          >
            <source src={srcVideo} type='video/webm' />
          </video>
        </div>
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
