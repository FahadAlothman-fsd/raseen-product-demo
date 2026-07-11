import type { Metadata, Viewport } from 'next'
import { Inter, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'RASEEN by Samawi — Operations Desk Demo',
  description:
    'RASEEN cloud governance and compliance platform by Samawi. A local, deterministic product demo covering continuous monitoring, regulatory audit sessions, and verifiable reporting.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#100f0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
