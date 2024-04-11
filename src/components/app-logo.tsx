import Image from 'next/image'
import Link from 'next/link'

export function AppLogo() {
  return (
    <Link className='flex ' href='/'>
      <Image src='/logo.png' alt='Application logo' width={30} height={30} />
      <span className='text-base sm:text-xl ml-2 hover:text-violet-200 transition-colors duration-300'>
        easyreadme
      </span>
    </Link>
  )
}
