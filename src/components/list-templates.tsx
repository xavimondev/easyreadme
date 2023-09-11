'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Template } from '@/types'
import { cn } from '@/lib/utils'
import { useTemplate } from '@/store'

const DEFAULT_TEMPLATES = [
  {
    srcImage: '/templates/t_boostgrammar.webp',
    altImage: 'Screenshot README xavimon',
    nameTemplate: 'Minimal',
    authorTemplate: 'xavimon',
    urlAuthor: 'https://github.com/xavimonp'
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
  const setTemplate = useTemplate((state) => state.setTemplate)
  const isSelected = templateSelected?.name === nameTemplate

  return (
    <div
      className='w-full rounded-md overflow-hidden cursor-pointer'
      onClick={() => setTemplate(nameTemplate)}
    >
      <figure>
        <Image
          src={srcImage}
          alt={altImage}
          width={300}
          height={300}
          className='w-full h-full object-cover rounded-md'
        />
        <figcaption
          className={cn('text-sm text-gray-400 mt-2 text-center italic', {
            'text-fuchsia-600': isSelected
          })}
        >
          {nameTemplate} by{' '}
          <Link href={urlAuthor} className='underline underline-offset-1'>
            {authorTemplate}
          </Link>
        </figcaption>
      </figure>
    </div>
  )
}

export function ListTemplates() {
  return (
    <div className='mt-6 flex flex-col gap-6'>
      {DEFAULT_TEMPLATES.map((template: Template) => (
        <TemplateItem key={template.nameTemplate} {...template} />
      ))}
    </div>
  )
}
