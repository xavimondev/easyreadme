'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Template } from '@/types'
import { cn } from '@/lib/utils'
import { useTemplate } from '@/store'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

const DEFAULT_TEMPLATES: Template[] = [
  {
    srcImage: '/templates/minimal.webp',
    altImage: 'Screenshot template Minimal',
    nameTemplate: 'Minimal',
    description:
      'Simplify README creation effortlessly. Craft clear and user-friendly project documentation using this template.',
    sections: ['Overview', 'Setting', 'Running', 'Deploy', 'License']
  },
  {
    srcImage: '/templates/collaborate.webp',
    altImage: 'Screenshot template Collaborate',
    nameTemplate: 'Collaborate',
    description:
      'Enhance project collaboration with comprehensive project docs. Streamline setup, development, and collaboration processes for smoother project execution.',
    sections: [
      'Banner',
      'Badges',
      'Tech Stack',
      'Project Summary',
      'Setting Up',
      'Running Locally',
      'Contributors',
      'License'
    ]
  },
  {
    srcImage: '/templates/inspire.webp',
    altImage: 'Screenshot template Inspire',
    nameTemplate: 'Inspire',
    description:
      'From project structure to deployment, Inspire streamlines every aspect for seamless development and collaboration.',
    sections: [
      'Banner',
      'Badges',
      'Overview',
      'Project Structure',
      'Project Summary',
      'Tech Stack',
      'Setting Up',
      'Running Locally',
      'Contributors',
      'Deploy',
      'License'
    ]
  },
  {
    srcImage: '/templates/empower.webp',
    altImage: 'Screenshot template Empower',
    nameTemplate: 'Empower',
    description:
      'Empower your project with structured documentation. Facilitate setup, development, and future planning for a more impactful project.',
    sections: [
      'Overview',
      'Tech Stack',
      'Setting Up',
      'Running Locally',
      'Roadmap',
      'Acknowledgments',
      'Changelog'
    ]
  },
  {
    srcImage: '/templates/unleash.webp',
    altImage: 'Screenshot template Pinnacle',
    nameTemplate: 'Unleash',
    description:
      'Unleash the full potential of your project with a dynamic documentation hub. From setup to FAQs, empower your team for a seamless project journey.',
    sections: [
      'Banner',
      'Badges',
      'Overview',
      'Project Structure',
      'Prerequisites',
      'Running Locally',
      'FAQ',
      'Roadmap',
      'Acknowledgments',
      'License'
    ]
  }
]

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
                'border border-fuchsia-600': isSelected
              })}
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
      </HoverCardTrigger>
      <HoverCardContent className='w-80 min-h-[100px]' align='start' side='right'>
        <div className='flex flex-col gap-4'>
          <h4 className='font-medium leading-none'>{nameTemplate}</h4>
          <p className='text-sm text-muted-foreground'>{description}</p>
          {sections && sections.length > 0 && (
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Sections({sections.length}):</span>
              <ul className='text-sm list-disc list-inside space-y-1'>
                {sections.map((section) => (
                  <li key={section} className='text-muted-foreground'>
                    {section}
                  </li>
                ))}
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
