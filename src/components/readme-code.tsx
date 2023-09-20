type ReadmeCodeProps = {
  content: string
}

export function ReadmeCode({ content }: ReadmeCodeProps) {
  return (
    <textarea
      className='border border-black dark:border-white/20 rounded-md text-black dark:text-white resize-none w-full h-full outline-none p-5 bg-white/95 dark:bg-white/5 text-base sm:text-lg scrollbar-hide'
      readOnly
      value={content}
    ></textarea>
  )
}
