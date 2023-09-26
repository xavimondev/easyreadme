'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Template } from '@/types'
import { cn } from '@/lib/utils'
import { useTemplate } from '@/store'

const DEFAULT_TEMPLATES: Template[] = [
  {
    srcImage: '/templates/minimal.webp',
    altImage: 'Screenshot template Minimal',
    nameTemplate: 'Minimal'
  },
  {
    srcImage: '/templates/collaborate.webp',
    altImage: 'Screenshot template Collaborate',
    nameTemplate: 'Collaborate'
  },
  {
    srcImage: '/templates/inspire.webp',
    altImage: 'Screenshot template Inspire',
    nameTemplate: 'Inspire'
  },
  {
    srcImage: '/templates/empower.webp',
    altImage: 'Screenshot template Empower',
    nameTemplate: 'Empower'
  },
  {
    srcImage: '/templates/unleash.webp',
    altImage: 'Screenshot template Pinnacle',
    nameTemplate: 'Unleash'
  }
]

export function TemplateItem({
  srcImage,
  altImage,
  nameTemplate,
  authorTemplate,
  urlAuthor
}: Template) {
  const templateSelected = useTemplate((state) => state.templateSelected)
  const setTemplateSelected = useTemplate((state) => state.setTemplateSelected)
  const isSelected = templateSelected === nameTemplate

  return (
    <div
      className='w-full rounded-md overflow-hidden cursor-pointer'
      onClick={() => setTemplateSelected(nameTemplate)}
    >
      <figure>
        <Image
          src={srcImage}
          alt={altImage}
          width={800}
          height={500}
          loading='lazy'
          className='w-full h-[220px] rounded-md object-cover'
        />
        <figcaption
          className={cn('text-sm text-gray-400 mt-2 text-center italic', {
            'text-fuchsia-600': isSelected
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
