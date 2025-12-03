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
      <div data-section="hero" id="hero">
        <EnterpriseKroneusHero />
      </div>

      <div data-section="what-we-build" className="-mt-96 relative z-10">
        <WhatWeBuildSection />
      </div>

      <div data-section="meet-sela" className="py-4">
        <IntroduceSELASection />
      </div>

      <div data-section="products" id="products" className="py-4">
        <ProductsSection />
      </div>

      <div data-section="demo" id="demo" className="py-4">
        <InteractiveSecurityDemo />
      </div>

      <div data-section="team" id="team" className="py-4">
        <ContactSection />
      </div>

      <div data-section="contact-form" id="contact-form" className="py-4">
        <TwoStepContactForm />
      </div>
    </div>
  )
}
