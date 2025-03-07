import { cn } from '@/lib/utils'

import { Typewriter } from './typewriter'

const TYPEWRITER_TEXTS = [
  'with AI-powered assistance.',
  'in just a few clicks.',
  'using elegant templates.',
  'with fully customizable sections.',
  'without an API key.',
  'by simplifying complexity.',
  'for better readability.'
]

const bgGradients = [
  'from-[#f7e397] to-[#c2bb3d] hover:to-[#f0e84e]',
  'from-[#f2c8ec] to-[#e180f4] hover:to-[#e061f9]'
]

function generateRandomGradient() {
  return bgGradients[Math.floor(Math.random() * bgGradients.length)]
}

export function MainHero() {
  return (
    <div className={cn('space-y-6')}>
      <h1
        className={cn(
          'text-4xl sm:text-5xl lg:text-8xl leading-tight font-semibold text-balance text-gray-200'
        )}
      >
        Generate Stunning{' '}
        <span className={cn('bg-gradient-to-tr text-transparent bg-clip-text', bgGradients)}>
          READMEs
        </span>{' '}
        in Seconds
      </h1>
      <div className='text-lg sm:text-xl flex flex-col sm:flex-row gap-1 w-full justify-center items-center'>
        <p className='text-neutral-300/70'>Effortless README creation</p>
        <Typewriter
          text={TYPEWRITER_TEXTS}
          speed={70}
          className={cn(
            'bg-gradient-to-tr text-transparent bg-clip-text',
            generateRandomGradient()
          )}
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={'_'}
        />
      </div>
    </div>
  )
}
