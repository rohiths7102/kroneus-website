'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function EnterpriseNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85])
  const logoGlow = useTransform(scrollY, [0, 100], [1, 0.6])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    if (id === '#hero') {
      scrollToTop()
      return
    }

    const element = document.querySelector(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 120

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-slate-900/70 backdrop-blur-2xl shadow-2xl border-b border-cyan-500/20'
        : 'bg-transparent'
        }`}
      style={{
        boxShadow: scrolled
          ? '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.1)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <button onClick={scrollToTop} className="flex items-center space-x-4 group relative z-50">
            <motion.div
              style={{ scale: logoScale }}
              className="relative"
            >
              <motion.div
                style={{ opacity: logoGlow }}
                className="absolute inset-0 rounded-2xl blur-xl"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(6, 182, 212, 0.6)',
                    '0 0 50px rgba(16, 185, 129, 0.6)',
                    '0 0 30px rgba(6, 182, 212, 0.6)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative">
                <Image
                  src="/kroneus-logo.png"
                  alt="KRONEUS"
                  width={120}
                  height={120}
                  priority
                  quality={100}
                  className="h-20 w-20 rounded-2xl group-hover:scale-110 transition-transform duration-300 relative z-10"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.7)) drop-shadow(0 0 25px rgba(16, 185, 129, 0.4))',
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />

                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3))',
                    padding: '2px',
                  }}
                />
              </div>
            </motion.div>

            <motion.div className="flex flex-col">
              <span
                className="text-3xl font-black tracking-tight leading-none"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #14b8a6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 20px rgba(6,182,212,0.3)',
                  filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.3))',
                }}
              >
                KRONEUS
              </span>
              <span className="text-xs text-cyan-300 tracking-widest font-medium">
                ZERO TRUST SECURITY
              </span>
            </motion.div>
          </button>

          <nav className="hidden md:flex items-center space-x-2">
            {[
              { name: 'Home', href: '#hero' },
              { name: 'Products', href: '#products' },
              { name: 'Demo', href: '#demo' },
              { name: 'Team', href: '#team' },
              { name: 'Contact', href: '#contact-form' },
            ].map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-3 text-base font-semibold text-slate-200 rounded-lg overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
                  {item.name}
                </span>

                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.a
              href="#contact-form"
              onClick={(e) => scrollToSection(e, '#contact-form')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-white font-bold rounded-xl overflow-hidden group"
              style={{
                boxShadow: '0 0 30px rgba(6,182,212,0.5), 0 0 50px rgba(16,185,129,0.3)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              <span className="relative z-10 flex items-center gap-2">
                Request Demo
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>
          </div>

          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-2xl border-t border-cyan-500/20"
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {[
            { name: 'Home', href: '#hero' },
            { name: 'Products', href: '#products' },
            { name: 'Demo', href: '#demo' },
            { name: 'Team', href: '#team' },
            { name: 'Contact', href: '#contact-form' },
          ].map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all"
            >
              {item.name}
            </motion.a>
          ))}

          <motion.a
            href="#contact-form"
            onClick={(e) => scrollToSection(e, '#contact-form')}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="block mt-4 px-6 py-4 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-white font-bold rounded-xl text-center"
            style={{
              boxShadow: '0 0 30px rgba(6,182,212,0.5)',
            }}
          >
            Request Demo
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
