import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
