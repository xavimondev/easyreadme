import { PropsWithChildren } from 'react'

export function Header({ children }: PropsWithChildren) {
  return <header className='border-b mx-2'>{children}</header>
}
