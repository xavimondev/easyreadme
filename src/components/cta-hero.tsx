import Link from 'next/link'
import { PenLineIcon } from 'lucide-react'

export function CTAHero() {
  return (
    <Link
      className='inline-flex px-3 py-2 bg-[#252338] dark:hover:bg-[#27263b] text-zinc-300 hover:bg-primary/90 rounded-md font-medium transition-colors border'
      href='/builder'
    >
      <PenLineIcon className='size-5 mr-2' />
      Generate a README
    </Link>
  )
}
