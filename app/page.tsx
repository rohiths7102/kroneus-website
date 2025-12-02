import EnterpriseKroneusHero from '@/components/home/KroneusHero'
import WhatWeBuildSection from '@/components/home/WhatWeBuildSection'
import IntroduceSELASection from '@/components/home/IntroduceSELASection'
import ProductsSection from '@/components/home/ProductsSection'
import InteractiveSecurityDemo from '@/components/home/DemoSection'
import ContactSection from '@/components/home/ContactSection'
import TwoStepContactForm from '@/components/home/TwoStepContactForm'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section - Rotating Quotes + Neon Edge + Reduced Glow */}
      <div data-section="hero" id="hero">
        <EnterpriseKroneusHero />
      </div>

      {/* 2. What We're Building Section */}
      <div data-section="what-we-build">
        <WhatWeBuildSection />
      </div>

      {/* 3. Introduce SELA Section */}
      <div data-section="meet-sela">
        <IntroduceSELASection />
      </div>

      {/* 4. Products Section - What SELA Secures */}
      <div data-section="products" id="products">
        <ProductsSection />
      </div>

      {/* 5. Interactive Demo */}
      <div data-section="demo" id="demo">
        <InteractiveSecurityDemo />
      </div>

      {/* 6. Contact Section */}
      <div data-section="contact" id="contact">
        <ContactSection />
      </div>

      {/* 7. Two-Step Contact Form */}
      <div data-section="contact-form">
        <TwoStepContactForm />
      </div>
    </div>
  )
}
