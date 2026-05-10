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
  title: 'Mahbeer | DevOps Engineer',
  description: 'DevOps Engineer specializing in CI/CD pipelines, Kubernetes, and cloud infrastructure.',
  metadataBase: new URL('https://mahbeer.in'),
  alternates: {
    canonical: 'https://mahbeer.in',
  },
  openGraph: {
    title: 'Mahbeer | DevOps Engineer',
    description: 'DevOps Engineer specializing in CI/CD pipelines, Kubernetes, and cloud infrastructure.',
    url: 'https://mahbeer.in',
    siteName: 'Mahbeer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mahbeer — DevOps Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahbeer | DevOps Engineer',
    description: 'DevOps Engineer specializing in CI/CD pipelines, Kubernetes, and cloud infrastructure.',
    images: ['/og-image.png'],
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
