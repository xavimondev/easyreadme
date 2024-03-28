export function AiLocally() {
  return (
    <div className='flex flex-col gap-2.5 text-center sm:text-left'>
      <h2 className='text-lg font-semibold leading-none tracking-tight'>Run Locally</h2>
      <p className='text-sm text-muted-foreground'>
        Additionally, you can run this application on your local machine using ollama. Follow these{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          className='text-cyan-500 underline underline-offset-4 hover:text-cyan-300'
          href='https://github.com/xavimondev/easyreadme?tab=readme-ov-file#-run-locally'
        >
          instructions
        </a>
        .
      </p>
    </div>
  )
}
