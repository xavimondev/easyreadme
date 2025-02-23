import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { APP_URL } from '@/constants'

import '../styles/globals.css'
import '../styles/confetti.css'

import { Toaster } from 'sonner'

const title = 'Easyreadme - IA Powered README Builder'
const description = `Create visually stunning READMEs with the help of IA and elegant templates.`
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
    <html lang='en' suppressHydrationWarning className='dark'>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster theme='system' />
      </body>
    </html>
  )
}
