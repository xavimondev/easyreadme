'use client'

import { useEffect, useState } from 'react'
import { copyToClipboard } from '@/utils'
import { CheckIc, CopyIc } from '@/components/icons'
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
      className='absolute right-6 top-[70px] transition-colors duration-200'
      onClick={async () => {
        setIsCopied(!isCopied)
        await copyToClipboard(content)
      }}
    >
      {isCopied ? <CheckIc className='w-5 h-5' /> : <CopyIc className='w-5 h-5' />}
    </Button>
  )
}
