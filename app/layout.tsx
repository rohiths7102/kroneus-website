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
  metadataBase: new URL('https://www.kroneuszerotrust.com'),
  title: 'KRONEUS - Zero Trust Security for Autonomous AI | Agentic AI Protection',
  description: 'SELA provides 9-layer Zero Trust protection for agentic AI. First-to-market model poisoning detection, MCP gateway security, multi-agent correlation, and blockchain audit logging. Protect your AI agents from prompt injection, data exfiltration, and supply chain attacks.',
  keywords: [
    'agentic AI security',
    'AI agent protection',
    'zero trust AI',
    'SELA security platform',
    'model poisoning detection',
    'prompt injection defense',
    'AI threat detection',
    'autonomous AI security',
    'MCP gateway',
    'multi-agent security',
    'AI supply chain protection',
    'A-DNA tokens',
    'blockchain audit trail',
    'KRONEUS',
    'AI cybersecurity',
    'LLM security',
    'agent firewall'
  ],
  authors: [{ name: 'KRONEUS', url: 'https://www.kroneuszerotrust.com' }],
  creator: 'KRONEUS',
  publisher: 'KRONEUS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kroneuszerotrust.com',
    siteName: 'KRONEUS - Zero Trust Security for Autonomous AI',
    title: 'KRONEUS - Zero Trust Security for Autonomous AI',
    description: 'SELA provides 9-layer Zero Trust protection for agentic AI with first-to-market model poisoning detection and hardware-bound authentication.',
    images: [
      {
        url: 'https://www.kroneuszerotrust.com/kroneus-logo.png',
        width: 1200,
        height: 630,
        alt: 'KRONEUS Logo - Zero Trust Security for Autonomous AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kroneus',
    creator: '@kroneus',
    title: 'KRONEUS - Zero Trust Security for Autonomous AI',
    description: 'First-to-market AI security platform protecting agentic AI from prompt injection, model poisoning, and supply chain attacks.',
    images: ['https://www.kroneuszerotrust.com/kroneus-logo.png'],
  },
  alternates: {
    canonical: 'https://www.kroneuszerotrust.com',
  },
  icons: {
    icon: [
      { url: '/kroneus-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/kroneus-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/kroneus-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KRONEUS',
  legalName: 'KRONEUS Zero Trust Security',
  url: 'https://www.kroneuszerotrust.com',
  logo: 'https://www.kroneuszerotrust.com/kroneus-logo.png',
  foundingDate: '2024',
  founders: [
    {
      '@type': 'Person',
      name: 'Rohith',
      jobTitle: 'CEO & Founder'
    },
    {
      '@type': 'Person',
      name: 'Yaashwanth Dayalan',
      jobTitle: 'Chief Operations Manager'
    }
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressRegion: 'England',
    addressCountry: 'GB'
  },
  sameAs: [
    'https://www.linkedin.com/company/kroneus-zero-trust-security/'
  ],
  description: 'KRONEUS builds advanced Zero Trust protection systems for agentic AI and autonomous intelligence. Our flagship product SELA provides 9-layer security with first-to-market model poisoning detection.',
  areaServed: 'Worldwide',
  knowsAbout: [
    'Agentic AI Security',
    'Zero Trust Architecture',
    'Model Poisoning Detection',
    'AI Threat Detection',
    'Autonomous Systems Protection',
    'Blockchain Audit Logging'
  ],
  product: {
    '@type': 'Product',
    name: 'SELA (Security Enforcement Layer for Agentic AI)',
    description: '9-layer Zero Trust security platform protecting AI agents from prompt injection, model poisoning, data exfiltration, and supply chain attacks.',
    brand: {
      '@type': 'Brand',
      name: 'KRONEUS'
    },
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'GBP'
    }
  }
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
        <link rel="apple-touch-icon" href="/kroneus-logo.png" />
        <meta property="og:image" content="https://www.kroneuszerotrust.com/kroneus-logo.png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
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
