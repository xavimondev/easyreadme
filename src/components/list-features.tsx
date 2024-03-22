'use client'

import { Feature } from '@/types/feature'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'

const LIST_FEATURES: Feature[] = [
  {
    id: 'ai',
    title: 'AI Simplifies Complexity',
    description:
      'Simplify README creation with AI-powered tools. Reduce complexity and enhance productivity effortlessly.',
    background:
      'from-[#f7e397] to-[#c2bb3d] hover:to-[#f0e84e] hover:-rotate-1 md:-translate-y-[1.5rem] md:-translate-x-[13rem] md:-rotate-[4deg] lg:-translate-y-[3.5rem] 2xl:translate-y-[3.5rem] 2xl:-translate-x-[17.5rem] 2xl:-rotate-[6deg]',
    textColorCard: 'text-yellow-800',
    textColorTitle: 'from-yellow-100 to-yellow-700',
    urlSticker: '/emojis/ai.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(194,187,61,1)]'
  },
  {
    id: 'ease',
    title: 'copy-paste markdown',
    description:
      'Copy and paste with ease. Save time and effort while creating stunning READMEs for your projects.',
    background:
      'from-[#f2c8ec] to-[#e180f4] hover:to-[#e061f9] hover:rotate-1 md:-translate-y-[1.5rem] md:-translate-x-[2rem] lg:-translate-y-[5rem] 2xl:-translate-y-1 2xl:translate-x-[4rem] rotate-[2deg]',
    textColorCard: 'text-pink-800',
    textColorTitle: 'from-pink-200 to-pink-700',
    urlSticker: '/emojis/clipboard.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(244,114,182,1)]'
  },
  {
    id: 'templates',
    title: 'sleek templates',
    description:
      'Choose from a variety of sleek and elegant templates. Enhance readability and organization for your READMEs.',
    background:
      'from-sky-200 to-[#58a6c7] hover:to-[#39819f] hover:-rotate-1 md:-translate-y-[12rem] md:translate-x-[13rem] lg:-translate-y-[15rem] 2xl:-translate-y-[11rem] 2xl:translate-x-[20rem] rotate-[4deg]',
    textColorCard: 'text-sky-800',
    textColorTitle: 'from-sky-200 to-blue-600',
    urlSticker: '/emojis/template.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(56,189,248,1)]'
  },
  {
    id: 'streamlined',
    title: 'simplified creation',
    description:
      'Streamline your README creation process with simplified steps. Focus on content while we handle the rest. Increase productivity effortlessly.',
    background:
      'from-[#b8f2d5] to-green-400 hover:to-[#298e4e] hover:rotate-1 md:-translate-y-[7rem] md:-translate-x-[12rem] lg:-translate-y-[10rem] 2xl:-translate-y-[5rem] 2xl:-translate-x-[11rem] -rotate-[2deg]',
    textColorCard: 'text-green-800',
    textColorTitle: 'from-green-200 to-teal-700',
    urlSticker: '/emojis/rocket.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(74,222,128,1)]'
  },
  {
    id: 'customization',
    title: 'effortless customization',
    description:
      'Customize your README effortlessly. Add or remove sections seamlessly to tailor templates to your project needs.',
    background:
      'from-[#27224d] to-[#151229] hover:to-[#0a071e] hover:-rotate-1 md:-translate-y-[12rem] md:translate-x-[10rem] lg:-translate-y-[15rem] lg:translate-x-[12rem] 2xl:-translate-y-[9rem] 2xl:translate-x-[19rem] rotate-[4deg]',
    textColorCard:
      'text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 via-red-300 to-yellow-100',
    textColorTitle: 'from-indigo-300 via-orange-200 to-red-800',
    urlSticker: '/emojis/wrench.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(129,140,248,1)]'
  },
  {
    id: 'flexibility',
    title: 'your own api key',
    description:
      'Enter your own API key for flexibility. Seamlessly integrate OpenAI functionalities and customize your experience.',
    background:
      'from-[#ffeda0] to-[#cb6c4a] hover:to-[#ea5a26] hover:-rotate-1 md:-translate-y-[11rem] md:-translate-x-[13rem] lg:-translate-y-[15rem] 2xl:-translate-y-[9rem] 2xl:-translate-x-[15rem] -rotate-[2deg]',
    textColorCard: 'text-orange-700',
    textColorTitle: 'from-orange-200 to-amber-700',
    urlSticker: '/emojis/key.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(251,146,60,1)]'
  },
  {
    id: 'offline',
    title: 'local execution',
    description:
      'Execute locally with ollama. Enjoy offline capabilities and manage your READMEs without an API key. Simplify your workflow and enhance productivity effortlessly.',
    background:
      'from-[#525a64] to-[#121212] hover:to-[#0b0a0a] hover:rotate-1 md:-translate-y-[16rem] md:translate-x-[8rem] lg:-translate-y-[20rem] 2xl:-translate-y-[12rem] 2xl:translate-x-[12rem] -rotate-[1deg]',
    textColorCard: 'text-zinc-300',
    textColorTitle: 'from-slate-300 to-stone-600',
    urlSticker: '/emojis/antenna.webp',
    shadowColor: 'hover:drop-shadow-[0_0_12px_rgba(148,163,184,1)]'
  }
]

type FeatureItemProps = {
  id: string
  title: string
  description: string
  background: string
  textColorCard: string
  textColorTitle: string
  urlSticker: string
  shadowColor: string
}

function FeatureItem({
  id,
  title,
  description,
  background,
  textColorCard,
  textColorTitle,
  urlSticker,
  shadowColor
}: FeatureItemProps) {
  const setFeatureSelected = useBuilder((store) => store.setFeatureSelected)

  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-lg p-3 border bg-gradient-to-r w-full hover:scale-105 transition-transform cursor-pointer',
        background
      )}
      onClick={() =>
        setFeatureSelected({
          id,
          title,
          description,
          background,
          textColorCard,
          textColorTitle,
          urlSticker,
          shadowColor
        })
      }
    >
      <div className={cn('flex gap-1 font-bold text-sm', textColorCard)}>
        <span>•</span>
        <span>{id}</span>
      </div>
      <h3 className={cn('text-lg 2xl:text-xl font-medium text-balance', textColorCard)}>{title}</h3>
    </div>
  )
}

export function ListFeatures() {
  return (
    <div className='w-64 2xl:w-80'>
      <div className='w-full h-full grid flex-col gap-2'>
        {LIST_FEATURES.map((feature) => (
          <FeatureItem key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  )
}
