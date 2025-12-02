'use client'

import { motion } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ContactSection() {
    return (
        <section id="contact" className="relative py-32 overflow-hidden">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Touch</span>
                    </h2>
                    <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
                        Ready to secure your autonomous AI infrastructure?
                    </p>
                </motion.div>

                {/* Team Members Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
                >
                    {/* Rohith Shankar - CTO */}
                    <div className="p-8 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/40 shadow-2xl hover:border-cyan-400/60 transition-all hover:scale-105">
                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold text-white mb-2">Rohith Shankar</h3>
                            <p className="text-xl text-cyan-400 font-semibold mb-3">Chief Technology Officer</p>
                            <div className="flex items-center justify-center text-slate-300 text-sm mb-4">
                                <MapPinIcon className="h-5 w-5 mr-2 text-cyan-400" />
                                London, UK
                            </div>
                        </div>

                        <div className="space-y-3">
                            <a
                                href="mailto:Rohithshasa@kroneuszt.onmicrosoft.com"
                                className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                                    Email
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/rohith-shankar-223139350/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                <svg className="h-5 w-5 mr-2 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span className="text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                                    LinkedIn
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Yaashwanth Dayalan - Cybersecurity Business Development */}
                    <div className="p-8 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-2xl rounded-3xl border-2 border-emerald-500/40 shadow-2xl hover:border-emerald-400/60 transition-all hover:scale-105">
                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold text-white mb-2">Yaashwanth Dayalan</h3>
                            <p className="text-xl text-emerald-400 font-semibold mb-3">Cybersecurity Business Development</p>
                            <div className="flex items-center justify-center text-slate-300 text-sm mb-4">
                                <MapPinIcon className="h-5 w-5 mr-2 text-emerald-400" />
                                Sydney, Australia
                            </div>
                        </div>

                        <div className="space-y-3">
                            <a
                                href="mailto:yaashwanth25@kroneuszt.onmicrosoft.com"
                                className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-slate-200 group-hover:text-emerald-300 transition-colors">
                                    Email
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/yaashwanth-dayalan-4444192b8/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                <svg className="h-5 w-5 mr-2 text-emerald-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span className="text-sm text-slate-200 group-hover:text-emerald-300 transition-colors">
                                    LinkedIn
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Athish Selvan - Security Operations Engineer */}
                    <div className="p-8 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-2xl rounded-3xl border-2 border-violet-500/40 shadow-2xl hover:border-violet-400/60 transition-all hover:scale-105">
                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold text-white mb-2">Athish Selvan</h3>
                            <p className="text-xl text-violet-400 font-semibold mb-3">Security Operations Engineer</p>
                            <div className="flex items-center justify-center text-slate-300 text-sm mb-4">
                                <MapPinIcon className="h-5 w-5 mr-2 text-violet-400" />
                                Brighton, UK
                            </div>
                        </div>

                        <div className="space-y-3">
                            <a
                                href="mailto:Athish1209@kroneuszt.onmicrosoft.com"
                                className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-violet-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-slate-200 group-hover:text-violet-300 transition-colors">
                                    Email
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/athish-selvan-158aaa255/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                <svg className="h-5 w-5 mr-2 text-violet-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span className="text-sm text-slate-200 group-hover:text-violet-300 transition-colors">
                                    LinkedIn
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Connect with KRONEUS Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-white mb-4">
                            Connect with KRONEUS
                        </h3>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                            Follow our journey in building the future of AI security. Get updates on research, product releases, and industry insights.
                        </p>
                    </div>

                    {/* LinkedIn Company Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-cyan-500/30 text-center">
                            <p className="text-4xl font-bold text-cyan-400 mb-2">🇬🇧 UK</p>
                            <p className="text-slate-300 text-lg">Working Location</p>
                        </div>
                        <div className="p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-emerald-500/30 text-center">
                            <p className="text-4xl font-bold text-emerald-400 mb-2">🇦🇺 Australia</p>
                            <p className="text-slate-300 text-lg">Working Location</p>
                        </div>
                    </div>

                    {/* LinkedIn Link */}
                    <div className="text-center">
                        <a
                            href="https://www.linkedin.com/company/kroneus-zero-trust-security/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xl rounded-2xl transition-all hover:scale-105 shadow-2xl"
                        >
                            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            Visit Our LinkedIn Page
                        </a>
                        <p className="text-slate-400 text-sm mt-4">
                            Technology, Information and Internet • Governance and defense for autonomous intelligence
                        </p>
                    </div>
                </motion.div>

                {/* Operations Section - REPLACES Follower/Employee counts */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    <div className="p-8 bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 backdrop-blur-xl rounded-2xl border border-cyan-500/40">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">🌍</div>
                            <h4 className="text-2xl font-bold text-white">Global Operations</h4>
                        </div>
                        <p className="text-lg text-slate-200 leading-relaxed">
                            Operating across the <span className="text-cyan-400 font-semibold">UK</span> and <span className="text-emerald-400 font-semibold">Australia</span>.
                        </p>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 backdrop-blur-xl rounded-2xl border border-emerald-500/40">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">💼</div>
                            <h4 className="text-2xl font-bold text-white">Remote-First</h4>
                        </div>
                        <p className="text-lg text-slate-200 leading-relaxed">
                            Remote-first security organization serving both regions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
