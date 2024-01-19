'use client'
import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { copyToClipboard } from '@/utils'
import { Button } from '@/components/ui/button'

type CopyButtonProps = {
  content: string
}

export function CopyButton({ content }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 1000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <Button
      variant='ghost'
      size='icon'
      className='absolute right-1 top-1 md:right-4 md:top-4 transition-colors duration-200'
      onClick={async () => {
        setIsCopied(!isCopied)
        await copyToClipboard(content)
      }}
    >
      {isCopied ? <Check className='w-5 h-5' /> : <Copy className='w-5 h-5' />}
    </Button>
  )
}
