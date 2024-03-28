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
      'from-[#f7e397] to-[#c2bb3d] hover:to-[#f0e84e] md:[--rotation:-3deg] md:[--y:54vh] md:[--left:calc(50vw-360px)] lg:[--left:calc(50vw-380px)] md:[--duration:0.4s] md:[--step:75vh] md:[--initial:-10deg]',
    textColorCard: 'text-yellow-800',
    textColorTitle: 'from-yellow-100 to-yellow-700'
  },
  {
    id: 'ease',
    title: 'copy-paste markdown',
    description:
      'Copy and paste with ease. Save time and effort while creating stunning READMEs for your projects.',
    background:
      'from-[#f2c8ec] to-[#e180f4] hover:to-[#e061f9] md:[--y:54vh] md:[--left:calc(50vw-130px)] lg:[--left:calc(50vw-100px)] md:[--rotation:0] md:[--duration:1s] md:[--step:70vh] md:[--initial:13deg]',
    textColorCard: 'text-pink-800',
    textColorTitle: 'from-pink-200 to-pink-700'
  },
  {
    id: 'templates',
    title: 'sleek templates',
    description:
      'Choose from a variety of sleek and elegant templates. Enhance readability and organization for your READMEs.',
    background:
      'from-sky-200 to-[#58a6c7] hover:to-[#39819f] md:[--rotation:4deg] md:[--y:54vh] md:[--left:calc(50vw+120px)] lg:[--left:calc(50vw+175px)] 2xl:[--rotation:3deg] md:[--duration:1.2s] md:[--step:75vh] md:[--initial:13deg]',
    textColorCard: 'text-sky-800',
    textColorTitle: 'from-sky-200 to-blue-600'
  },
  {
    id: 'customization',
    title: 'effortless customization',
    description:
      'Customize your README effortlessly. Add or remove sections seamlessly to tailor templates to your project needs.',
    background:
      'from-[#27224d] to-[#151229] hover:to-[#0a071e] md:[--y:65vh] md:[--left:calc(50vw-100px)] md:[--rotation:0] md:[--duration:1.4s] md:[--step:85vh] md:[--initial:15deg]',
    textColorCard:
      'text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 via-red-300 to-yellow-100',
    textColorTitle: 'from-indigo-300 via-orange-200 to-red-800'
  },
  {
    id: 'flexibility',
    title: 'your own api key',
    description:
      'Enter your own API key for flexibility. Seamlessly integrate OpenAI functionalities and customize your experience.',
    background:
      'from-[#ffeda0] to-[#cb6c4a] hover:to-[#ea5a26] md:[--y:78vh] 2xl:[--y:75vh] md:[--left:calc(50vw-300px)] md:[--rotation:-4deg] md:[--duration:0.8s] md:[--step:90vh] md:[--initial:-13deg]',
    textColorCard: 'text-orange-700',
    textColorTitle: 'from-orange-200 to-amber-700'
  },
  {
    id: 'offline',
    title: 'local execution',
    description:
      'Execute locally with ollama. Enjoy offline capabilities and manage your READMEs without an API key. Simplify your workflow and enhance productivity effortlessly.',
    background:
      'from-[#525a64] to-[#121212] hover:to-[#0b0a0a] md:[--y:78vh] 2xl:[--y:75vh] md:[--left:calc(50vw+75px)] md:[--rotation:4deg] md:[--duration:1.6s] md:[--step:92vh] md:[--initial:16deg]',
    textColorCard: 'text-zinc-300',
    textColorTitle: 'from-slate-300 to-stone-600'
  }
]

type FeatureItemProps = {
  id: string
  title: string
  description: string
  background: string
  textColorCard: string
  textColorTitle: string
}

function FeatureItem({
  id,
  title,
  description,
  background,
  textColorCard,
  textColorTitle
}: FeatureItemProps) {
  const setFeatureSelected = useBuilder((store) => store.setFeatureSelected)

  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-lg p-3 border bg-gradient-to-r md:w-52 lg:w-64 h-auto transition-colors duration-300 cursor-pointer absolute left-[var(--left)] -top-[50px] animate-drop-bounce',
        background
      )}
      onClick={() =>
        setFeatureSelected({
          id,
          title,
          description,
          background,
          textColorCard,
          textColorTitle
        })
      }
    >
      <div className={cn('flex gap-1 font-bold text-sm', textColorCard)}>
        <span>•</span>
        <span>{id}</span>
      </div>
      <h3
        className={cn('text-base lg:text-lg 2xl:text-xl font-medium text-balance', textColorCard)}
      >
        {title}
      </h3>
    </div>
  )
}

export function ListFeatures() {
  return (
    <div className='size-full flex gap-2'>
      {LIST_FEATURES.map((feature) => (
        <FeatureItem key={feature.id} {...feature} />
      ))}
    </div>
  )
}
