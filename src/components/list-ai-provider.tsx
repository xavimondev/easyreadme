'use client'

import { type SVGProps } from 'react'

import { AIProvider } from '@/types/ai'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { MistralIc, OpenAIc } from '@/components/icons'

const data: Array<{ title: AIProvider; Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element }> = [
  {
    title: 'OpenAI',
    Icon: OpenAIc
  },
  {
    title: 'Mistral',
    Icon: MistralIc
  }
]

type ProviderItemProps = {
  title: AIProvider
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

function ProviderItem({ title, Icon }: ProviderItemProps) {
  const providerAISelected = useBuilder((store) => store.providerAISelected)
  const setProviderAISelected = useBuilder((store) => store.setProviderAISelected)

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 border  hover:bg-neutral-900/50 p-3 rounded-md transition-colors duration-200 cursor-pointer shadow-sm',
        providerAISelected === title ? 'border-neutral-100' : 'border-neutral-800'
      )}
      onClick={() => setProviderAISelected(title)}
    >
      <Icon className='size-6' />
      <span>{title}</span>
    </div>
  )
}

export function ListAIProvider() {
  return (
    <div className='flex gap-2 w-full'>
      {data.map((item) => (
        <ProviderItem key={item.title} title={item.title} Icon={item.Icon} />
      ))}
    </div>
  )
}
