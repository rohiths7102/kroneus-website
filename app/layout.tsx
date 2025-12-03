import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import EnterpriseNavigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import Chatbot from '@/components/premium/Chatbot'
import ScrollProgress from '@/components/premium/ScrollProgress'
import SmoothScroll from '@/components/premium/SmoothScroll'
import EnterpriseScrollTransitions from '@/components/premium/EnterpriseScrollTransitions'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'KRONEUS - Zero Trust Security for Autonomous AI',
  description: 'Governance and defense for autonomous intelligence. KRONEUS builds advanced protection systems for agentic AI and next-generation digital infrastructure.',
  keywords: 'AI security, agentic AI, autonomous systems, zero trust, SELA, cybersecurity, AI governance, threat detection, policy enforcement',
  authors: [{ name: 'KRONEUS' }],
  openGraph: {
    title: 'KRONEUS - Zero Trust Security for Autonomous AI',
    description: 'Research-driven security organization protecting autonomous AI systems with SELA, our flagship AI-native security platform.',
    url: 'https://kroneus.ai',
    siteName: 'KRONEUS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KRONEUS - Zero Trust Security for Autonomous AI',
    description: 'Advanced protection systems for agentic AI and autonomous intelligence.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/kroneus-logo.png" as="image" />
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
            window.addEventListener('beforeunload', function() {
              window.scrollTo(0, 0);
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll />
          <EnterpriseScrollTransitions />
          <ScrollProgress />
          
          <div className="min-h-screen flex flex-col">
            <EnterpriseNavigation />
            
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
          </div>
          
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
