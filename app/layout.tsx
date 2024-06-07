import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { getBaseUrl } from '@/app/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Tiesen API',
  description: 'API for doing some stuff',
  icons: { icon: '/favicon.ico' },
  openGraph: { url: getBaseUrl() },
  alternates: { canonical: getBaseUrl() },
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      style={{
        ...inter.style,
        backgroundColor: 'hsl(240 10% 3.9%)',
        color: 'hsl(0 0% 98%)',
        minHeight: '100dvh',
        padding: '0',
        margin: '0',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </body>
  </html>
)

export default RootLayout
