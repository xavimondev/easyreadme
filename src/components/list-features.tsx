'use client'

import { Feature } from '@/types/feature'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'

const LIST_FEATURES: Feature[] = [
  {
    id: 'ai',
    title: 'AI',
    description: 'Reduce complexity and enhance productivity effortlessly with AI.',
    textColorTitle: 'from-yellow-100 to-yellow-700',
    background: 'from-[#f7e397] to-[#c2bb3d] hover:to-[#f0e84e]',
    textColorCard: 'text-yellow-800'
  },
  {
    id: 'ease',
    title: 'Copy-Paste',
    description: 'Copy and paste with ease. Save time and effort while creating stunning READMEs.',
    textColorTitle: 'from-pink-200 to-pink-700',
    background: 'from-[#f2c8ec] to-[#e180f4] hover:to-[#e061f9]',
    textColorCard: 'text-pink-800'
  },
  {
    id: 'templates',
    title: 'Templates',
    description:
      'Choose from a variety of elegant templates. Enhance readability for your READMEs.',
    textColorTitle: 'from-sky-200 to-blue-600',
    background: 'from-sky-200 to-[#58a6c7] hover:to-[#39819f]',
    textColorCard: 'text-sky-800'
  },
  {
    id: 'customization',
    title: 'Customization',
    description: 'Add or remove sections seamlessly to tailor templates to your project needs.',
    textColorTitle: 'from-indigo-300 via-orange-200 to-red-800',
    background: 'from-[#27224d] to-[#151229] hover:to-[#0a071e]',
    textColorCard: 'text-purple-100'
  },
  {
    id: 'offline',
    title: 'Local',
    description: 'Enjoy offline capabilities and manage your READMEs without an API key.',
    textColorTitle: 'from-orange-200 to-amber-700',
    background: 'from-[#ffeda0] to-[#cb6c4a] hover:to-[#ea5a26]',
    textColorCard: 'text-orange-700'
  }
]

type FeatureItemProps = {
  id: string
  title: string
  description: string
  textColorTitle: string
  background: string
  textColorCard: string
}

function FeatureItem({
  title,
  description,
  textColorTitle,
  background,
  textColorCard
}: FeatureItemProps) {
  const setFeatureSelected = useBuilder((store) => store.setFeatureSelected)
  const featureSelected = useBuilder((store) => store.featureSelected)

  return (
    <div
      className={cn(
        'group z-10 w-full h-auto flex items-center bg-gradient-to-tr rounded-md p-2 border bg-transparent cursor-pointer',
        featureSelected?.title === title && background
      )}
      onClick={() =>
        setFeatureSelected({
          title,
          description,
          textColorTitle
        })
      }
    >
      <div className='flex flex-col gap-1'>
        <h3
          className={cn(
            'text-xs md:text-sm text-balance font-semibold text-[#737373] group-hover:pointer-events-none transition-all duration-300 ease-in-out',
            featureSelected?.title === title ? `${textColorCard}` : 'group-hover:text-white'
          )}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}

export function ListFeatures() {
  return (
    <div className='w-full h-auto hidden sm:flex gap-3'>
      {LIST_FEATURES.map((feature) => (
        <FeatureItem key={feature.id} {...feature} />
      ))}
    </div>
  )
}
