import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tiesen API',
  description: 'API for doing some stuff',
  icons: { icon: '/favicon.ico' },
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
