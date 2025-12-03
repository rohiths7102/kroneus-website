'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { CheckCircleIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function TwoStepContactForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const step2Ref = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitSuccess(true)
                setStep(2)

                setTimeout(() => {
                    step2Ref.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    })
                }, 500)
            } else {
                throw new Error(data.error || 'Failed to send')
            }
        } catch (error) {
            console.error('Error sending email:', error)
            alert('There was an error submitting your form. Please try again or contact our support team.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="mb-20"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                    Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Security Audit</span>
                                </h2>
                                <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
                                    Book a 30-minute session with our security architects to see how SELA can protect your autonomous AI infrastructure.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/40 shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-lg font-semibold text-white mb-3">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-lg font-semibold text-white mb-3">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="phone" className="block text-lg font-semibold text-white mb-3">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="service" className="block text-lg font-semibold text-white mb-3">
                                        What service are you interested in? *
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        required
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select a service...</option>
                                        <option value="banking">Banking & Finance Security</option>
                                        <option value="retail">Retail & E-Commerce Security</option>
                                        <option value="autonomous">Autonomous Vehicles & IoT Security</option>
                                        <option value="enterprise">Enterprise IT Security</option>
                                        <option value="pilot">Pilot Program Partnership</option>
                                        <option value="demo">Request SELA Demo</option>
                                        <option value="other">Other / General Inquiry</option>
                                    </select>
                                </div>

                                <div className="mb-8">
                                    <label htmlFor="message" className="block text-lg font-semibold text-white mb-3">
                                        How can we help you? *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us about your AI security needs, challenges, or questions..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-10 py-5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 hover:from-cyan-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold text-xl rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        'Submit Contact Request'
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            ref={step2Ref}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mb-12"
                            >
                                <CheckCircleIcon className="h-24 w-24 text-emerald-400 mx-auto mb-6" />
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                    Thank You!
                                </h2>
                                <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
                                    We've received your contact request and will respond within 24 hours.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-2xl rounded-3xl border-2 border-emerald-500/40 shadow-2xl"
                            >
                                <CalendarIcon className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
                                <h3 className="text-4xl font-bold text-white mb-6">
                                    Want to schedule a meeting now?
                                </h3>
                                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                    Skip the wait and book a time that works for you. We'll discuss your security needs via Microsoft Teams and show you how SELA can protect your autonomous AI.
                                </p>

                                <a
                                    href="https://calendly.com/rohithshasa-kroneuszt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xl rounded-2xl transition-all hover:scale-105 shadow-2xl"
                                >
                                    <CalendarIcon className="h-7 w-7" />
                                    Schedule Teams Meeting Now
                                </a>

                                <p className="text-slate-400 mt-6 text-sm">
                                    Optional - You can also wait for us to reach out to you
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
