import { RATE_LIMIT } from '@/constants'

type CounterInfoProps = {
  remaining: number
}

export function CounterInfo({ remaining }: CounterInfoProps) {
  return (
    <p className='text-sm text-muted-foreground'>
      You have{' '}
      <span className='text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-purple-100'>
        {remaining} / {RATE_LIMIT} generations
      </span>{' '}
      left. Use your API Key to keep generating AI sections.
    </p>
  )
}
