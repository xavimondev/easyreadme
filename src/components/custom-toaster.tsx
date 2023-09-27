'use client'
import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

export function CustomToaster() {
  const { theme } = useTheme() as {
    theme: 'light' | 'dark' | 'system'
  }
  return <Toaster theme={theme} />
}
