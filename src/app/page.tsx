import { ArrowRightIc, GitIc, LightningIc, TextIc } from '@/components/icons';
import { Markdown } from '@/components/markdown';

export default function Home() {
  return (
    <main className='grid place-items-center min-h-screen w-full p-4'>
      <div className='w-full'>
        <section className='px-6 text-center mb-16 mx-auto max-w-md sm:max-w-4xl'>
          <h1 className='mt-5 font-bold text-white text-4xl sm:text-6xl'>
            Create README with{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a5e29c] to-[#63cd77]'>
              IA
            </span>
          </h1>
          <p className='mx-auto max-w-md sm:max-w-2xl mt-8 text-white/40 text-lg sm:text-2xl'>
            Effortlessly create READMEs using IA
          </p>
          <form method='POST' className='mt-8 gap-4 flex flex-col'>
            <div className='relative flex w-full items-center'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/40'>
                <GitIc className='w-4 h-4' />
              </div>
              <input
                type='url'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                className='transition-colors duration-200 w-full rounded-md border border-white border-opacity-20 bg-transparent px-3 py-2 text-sm placeholder:text-white/20 disabled:cursor-not-allowed disabled:opacity-50 h-11 pl-9 focus-visible:border-opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                required
                placeholder='Your repository https://github.com/xavimondev/readme-creator'
                name='urlRepository'
              />
            </div>
            <div className='relative flex w-full items-center'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/40'>
                <TextIc className='w-4 h-4' />
              </div>
              <input
                type='url'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                className='transition-colors duration-200 w-full rounded-md border border-white border-opacity-20 bg-transparent px-3 py-2 text-sm placeholder:text-white/20 disabled:cursor-not-allowed disabled:opacity-50 h-11 pl-9 focus-visible:border-opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                required
                placeholder='README from https://github.com/langchain-ai/langchain'
                name='urlReadme'
              />
              <button
                className='border border-white border-opacity-20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md px-2.5 right-2 h-8 absolute hover:bg-white/10'
                type='submit'
              >
                <ArrowRightIc className='w-4 h-4' />
              </button>
            </div>
          </form>
          <div className='flex items-center gap-2 p-3 mt-6 rounded-md border border-dashed border-fuchsia-500/20 bg-fuchsia-900/20 text-fuchsia-400'>
            <LightningIc className='w-4 h-4' />
            <p className='text-sm'>Generating README...</p>
          </div>
        </section>
        <section className='mx-auto sm:max-w-[96rem]'>
          <Markdown />
        </section>
      </div>
    </main>
  );
}
