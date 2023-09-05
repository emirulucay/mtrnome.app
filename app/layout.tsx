import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple, easy and open-source metronome app.',
  description: 'Simple metronome for musicians with great user experience and gorgeus interface.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
