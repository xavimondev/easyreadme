import { NodeViewWrapper } from '@tiptap/react'
import {
  AlertTriangle,
  InfoIcon,
  Lightbulb,
  MessageCircleWarning,
  MessageSquareWarning
} from 'lucide-react'

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
  const { node } = props
  const { attrs } = node
  const { id, isHTML } = attrs
  const alert = ALERTS_DATA.find((item) => item.id === id)
  const { label, description, icon, borderColor, textColor } = alert ?? {}

  return (
    <NodeViewWrapper className='!m-0 !p-0' as='div'>
      <div className='relative group'>
        <div className={`${borderColor} mb-4 px-4 py-2 border-l-[5px] content`}>
          <blockquote className='!mt-0.5 !ml-0 !mb-1 !p-0 not-italic border-none'>
            {!isHTML ? (
              <p
                contentEditable={false}
                className={`${textColor} flex items-center leading-[1] font-medium before:content-[''] !mt-1`}
              >
                {icon}
                {label}
              </p>
            ) : (
              <p>[!{label?.toUpperCase()}]</p>
            )}
            <p
              className='!mb-0 after:content-[""] !outline-none'
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              {description}
            </p>
          </blockquote>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
