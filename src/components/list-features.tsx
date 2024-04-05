'use client'

import { Feature } from '@/types/feature'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { Separator } from '@/components/ui/separator'
import { StickerFeature } from '@/components/sticker-feature'

const LIST_FEATURES: Feature[] = [
  {
    id: 'ai',
    title: 'AI Simplifies Complexity',
    description:
      'Simplify README creation with AI-powered tools. Reduce complexity and enhance productivity effortlessly.',
    background: 'from-[#f7e397] to-[#c2bb3d] hover:to-[#f0e84e] lg:[--delay:0.5s]',
    textColorCard: 'text-yellow-800',
    textColorTitle: 'from-yellow-100 to-yellow-700',
    emojiUrl: '/emojis/ai.webp'
  },
  {
    id: 'ease',
    title: 'copy-paste markdown',
    description:
      'Copy and paste with ease. Save time and effort while creating stunning READMEs for your projects.',
    background: 'from-[#f2c8ec] to-[#e180f4] hover:to-[#e061f9] lg:[--delay:0.7s]',
    textColorCard: 'text-pink-800',
    textColorTitle: 'from-pink-200 to-pink-700',
    emojiUrl: '/emojis/clipboard.webp'
  },
  {
    id: 'templates',
    title: 'sleek templates',
    description:
      'Choose from a variety of sleek and elegant templates. Enhance readability and organization for your READMEs.',
    background: 'from-sky-200 to-[#58a6c7] hover:to-[#39819f] lg:[--delay:0.9s]',
    textColorCard: 'text-sky-800',
    textColorTitle: 'from-sky-200 to-blue-600',
    emojiUrl: '/emojis/rocket.webp'
  },
  {
    id: 'customization',
    title: 'effortless customization',
    description:
      'Customize your README effortlessly. Add or remove sections seamlessly to tailor templates to your project needs.',
    background: 'from-[#27224d] to-[#151229] hover:to-[#0a071e] lg:[--delay:1.1s]',
    textColorCard:
      'text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 via-red-300 to-yellow-100',
    textColorTitle: 'from-indigo-300 via-orange-200 to-red-800',
    emojiUrl: '/emojis/wrench.webp'
  },
  {
    id: 'flexibility',
    title: 'your own api key',
    description:
      'Enter your own API key for flexibility. Seamlessly integrate OpenAI functionalities and customize your experience.',
    background: 'from-[#ffeda0] to-[#cb6c4a] hover:to-[#ea5a26] lg:[--delay:1.3s]',
    textColorCard: 'text-orange-700',
    textColorTitle: 'from-orange-200 to-amber-700',
    emojiUrl: '/emojis/key.webp'
  },
  {
    id: 'offline',
    title: 'local execution',
    description:
      'Execute locally with ollama. Enjoy offline capabilities and manage your READMEs without an API key. Simplify your workflow and enhance productivity effortlessly.',
    background: 'from-[#525a64] to-[#121212] hover:to-[#0b0a0a] lg:[--delay:1.5s]',
    textColorCard: 'text-zinc-300',
    textColorTitle: 'from-slate-300 to-stone-600',
    emojiUrl: '/emojis/antenna.webp'
  }
]

type FeatureItemProps = {
  id: string
  title: string
  description: string
  background: string
  textColorCard: string
  textColorTitle: string
  emojiUrl: string
}

function FeatureItem({
  id,
  title,
  description,
  background,
  textColorCard,
  textColorTitle,
  emojiUrl
}: FeatureItemProps) {
  const setFeatureSelected = useBuilder((store) => store.setFeatureSelected)

  return (
    <div
      className={cn(
        'w-full h-auto flex items-center rounded-lg p-3 border bg-gradient-to-r transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 animate-beauty-fade-in',
        background
      )}
      onMouseOver={() =>
        setFeatureSelected({
          title,
          description,
          textColorTitle
        })
      }
    >
      <StickerFeature title={`Sticker for ${title}`} url={emojiUrl!} />
      <Separator
        orientation='vertical'
        className={cn('h-full mx-4 bg-gradient-to-l', background)}
      />
      <div className='flex flex-col gap-1'>
        <div className={cn('flex gap-1 font-bold text-sm', textColorCard)}>
          <span>•</span>
          <span>{id}</span>
        </div>
        <h3 className={cn('text-base lg:text-xl 2xl:text-2xl text-balance', textColorCard)}>
          {title}
        </h3>
      </div>
    </div>
  )
}

export function ListFeatures() {
  return (
    <div className='w-1/3 h-full hidden lg:flex flex-col gap-3 justify-center'>
      {LIST_FEATURES.map((feature) => (
        <FeatureItem key={feature.id} {...feature} />
      ))}
    </div>
  )
}
