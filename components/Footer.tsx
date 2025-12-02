'use client'

import Link from 'next/link'
import {
  ShieldCheckIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const footerLinks = {
  product: [
    { name: 'Overview', href: '/products' },
    { name: 'Retail Agent Shield', href: '/products/retail' },
    { name: 'Hospital Agent Guard', href: '/products/hospital' },
    { name: 'Banking Agent Defender', href: '/products/banking' },
    { name: 'Business Framework', href: '/products/business' },
  ],
  resources: [
    { name: 'Documentation', href: '/resources' },
    { name: 'Whitepapers', href: '/resources#whitepapers' },
    { name: 'FAQs', href: '/resources#faqs' },
    { name: 'Compliance', href: '/resources#compliance' },
    { name: 'Download OpenAPI', href: '/resources#openapi' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/about#careers' },
    { name: 'Press', href: '/about#press' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">KRONEUS</span>
            </Link>
            <p className="text-slate-400 mb-4 max-w-sm">
              Zero Trust Security for Autonomous Intelligence. Building advanced protection systems for agentic AI and next-generation digital infrastructure.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <EnvelopeIcon className="h-5 w-5 text-primary-500" />
                <a href="mailto:Rohithshasa@kroneuszt.onmicrosoft.com" className="hover:text-primary-500 transition-colors">
                  Rohithshasa@kroneuszt.onmicrosoft.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="h-5 w-5 text-primary-500" />
                <span>London, BRENT, UK</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} KRONEUS. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-primary-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
