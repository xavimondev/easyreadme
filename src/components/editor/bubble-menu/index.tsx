import { Separator } from '@/components/ui/separator'

import { EditorBubble } from './editor-bubble'
import { LinkSelector } from './link-selector'
import { TextAlignOptions } from './text-align-options'
import { TextFormatOptions } from './text-format-options'

export function BubbleMenu() {
  return (
    <EditorBubble
      tippyOptions={{
        placement: 'top'
      }}
      className='flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl h-[42px]'
    >
      <LinkSelector />
      <Separator orientation='vertical' />
      <TextAlignOptions />
      <Separator orientation='vertical' />
      <TextFormatOptions />
      <Separator orientation='vertical' />
    </EditorBubble>
  )
}
