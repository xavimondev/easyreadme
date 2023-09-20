import { CopyButton } from '@/components/copy-button'
import { ReadmeCode } from '@/components/readme-code'

type CodeBlockProps = {
  content: string
}

export function CodeBlock({ content }: CodeBlockProps) {
  return (
    <div className='w-full rounded-md overflow-hidden h-[calc(100vh-80px)]'>
      <CopyButton content={content} />
      <ReadmeCode content={content} />
    </div>
  )
}
