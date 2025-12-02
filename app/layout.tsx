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
import EnterpriseWebGLBackground from '@/components/premium/EnterpriseWebGLBackground'

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
        {/* Preload critical assets */}
        <link rel="preload" href="/kroneus-logo.png" as="image" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-slate-950`}>
        <ThemeProvider>
          {/* FIXED: Replaced solid black WebGL background with subtle gradient */}
          <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Optional: Add subtle animation back later */}
          </div>
          
          {/* Smooth scroll implementation */}
          <SmoothScroll />
          
          {/* Enterprise scroll transitions */}
          <EnterpriseScrollTransitions />
          
          {/* Scroll progress bar */}
          <ScrollProgress />
          
          <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <EnterpriseNavigation />
            
            {/* Main content */}
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
          
          {/* AI Chatbot */}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
