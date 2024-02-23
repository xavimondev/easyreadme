import { NodeViewWrapper } from '@tiptap/react'
import {
  AlertTriangle,
  InfoIcon,
  Lightbulb,
  MessageCircleWarning,
  MessageSquareWarning
} from 'lucide-react'

import { ActionsBar } from './actions-bar'

const ALERTS_DATA = [
  {
    id: 'info',
    label: 'Note',
    description: 'Useful information that users should know, even when skimming content.',
    icon: <InfoIcon size={18} className='mr-1' />,
    borderColor: 'border-l-[#1f6feb]',
    textColor: 'text-[#2f81f7]'
  },
  {
    id: 'tip',
    label: 'Tip',
    description: 'Helpful advice for doing things better or more easily.',
    icon: <Lightbulb size={18} className='mr-1' />,
    borderColor: 'border-l-[#238636]',
    textColor: 'text-[#3fb950]'
  },
  {
    id: 'important',
    label: 'Important',
    description: 'Key information users need to know to achieve their goal.',
    icon: <MessageSquareWarning size={18} className='mr-1' />,
    borderColor: 'border-l-[#8957e5]',
    textColor: 'text-[#a371f7]'
  },
  {
    id: 'warning',
    label: 'Warning',
    description: 'Urgent info that needs immediate user attention to avoid problems.',
    icon: <AlertTriangle size={18} className='mr-1' />,
    borderColor: 'border-l-[#9e6a03]',
    textColor: 'text-[#d29922]'
  },
  {
    id: 'caution',
    label: 'Caution',
    description: 'Advises about risks or negative outcomes of certain actions.',
    icon: <MessageCircleWarning size={18} className='mr-1' />,
    borderColor: 'border-l-[#da3633]',
    textColor: 'text-[#f85149]'
  }
]

export function Alert(props: any) {
  const { node, deleteNode } = props
  const { attrs } = node
  const { id } = attrs
  const alert = ALERTS_DATA.find((item) => item.id === id)
  const { label, description, icon, borderColor, textColor } = alert ?? {}

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className={`mb-4 px-4 py-2 border-l-[5px] ${borderColor} content`}>
          <blockquote
            className={`${textColor} flex items-center leading-[1] font-medium !mt-1 not-italic border-none !p-0 !ml-0`}
            contentEditable={false}
          >
            {icon}
            {label}
          </blockquote>
          <blockquote
            className='!mb-0 !outline-none not-italic border-none !p-0 !ml-0'
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {description}
          </blockquote>
        </div>
        <ActionsBar
          removeSection={() => {
            deleteNode()
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
