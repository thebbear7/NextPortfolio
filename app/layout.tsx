import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mahbeer — DevOps Engineer',
  description: 'Personal portfolio of Muhammad Mahbeer, DevOps Engineer based in Srinagar, India.',
  openGraph: {
    title: 'Mahbeer — DevOps Engineer',
    description: 'Personal portfolio of Muhammad Mahbeer, DevOps Engineer based in Srinagar, India.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
