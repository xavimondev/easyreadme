import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { APP_URL } from '@/constants'
import { ThemeProvider } from '@/components/theme-provider'

import '../styles/globals.css'
import '../styles/confetti.css'

import { Toaster } from 'sonner'

const title = 'Easyreadme - IA Powered README Builder'
const description = `Easyreadme helps you simplify README creation and generate visually stunning ones with the help of IA and elegant pre-designed templates.`
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  keywords: ['readme', 'easiest', 'ia', 'builder', 'markdown', 'git', 'github', 'gitlab'],
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Easyreadme.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/banner.jpg',
        width: 1835,
        height: 1000,
        type: 'image/jpeg'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <Toaster theme='system' />
      </body>
    </html>
  )
}
