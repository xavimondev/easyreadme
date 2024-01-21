import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { APP_URL } from '@/constants'
import { CustomToaster } from '@/components/custom-toaster'
import { ThemeProvider } from '@/components/theme-provider'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['500', '600', '700'] })

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
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <CustomToaster />
      </body>
    </html>
  )
}
