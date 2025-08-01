import { PerformanceWrapper } from '@/components/layout/PerformanceWrapper'
import { PusherProvider } from '@/lib/providers/PusherProvider'
import { QueryProvider } from '@/lib/providers'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Request Hub',
  description: 'Enterprise request management platform',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: 'rgb(34 124 100)',
          colorBackground: 'rgb(249 250 251)',
          colorText: 'rgb(17 24 39)',
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <QueryProvider>
            <PusherProvider>
              <PerformanceWrapper>{children}</PerformanceWrapper>
            </PusherProvider>
          </QueryProvider>
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
