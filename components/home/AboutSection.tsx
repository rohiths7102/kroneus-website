'use client'

import { motion } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const team = [
    {
        name: 'Rohith Shankar',
        role: 'CEO & Founder',
        location: 'London, UK',
        email: 'Rohithshasa@kroneuszt.onmicrosoft.com',
        linkedin: 'https://www.linkedin.com/in/rohith-shankar-223139350/',
    },
    {
        name: 'Yaashwanth Daylan',
        role: 'Co-Founder',
        location: 'Sydney, Australia',
        email: 'yaashwanth25@kroneuszt.onmicrosoft.com',
        linkedin: 'https://www.linkedin.com/in/yaashwanth-dayalan-4444192b8/',
    },
    {
        name: 'Athish Selvan',
        role: 'Co-Founder',
        location: 'Brighton, UK',
        email: 'Athish1209@kroneuszt.onmicrosoft.com',
        linkedin: 'https://www.linkedin.com/in/athish-selvan-158aaa255/',
    },
]

export default function AboutSection() {
    return (
        <section id="about" className="relative py-32 overflow-hidden">
            {/* Darkened Unified Cyber Background - REMOVED (Global in layout) */}
            <div className="absolute inset-0">
                {/* Global background shows through */}
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">KRONEUS</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        A research-driven security organization focused on building advanced protection systems for agentic AI
                    </p>
                </motion.div>

                {/* Company Story */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30"
                >
                    <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                        We ensure that autonomous and AI-enabled systems operate safely and securely in real environments. As AI grows more capable, the risks grow with it.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        KRONEUS develops protection tools that safeguard decision engines, AI models, and high-value applications from manipulation, fraud, exploitation, and emerging adversarial behaviour.
                    </p>
                </motion.div>

                {/* Team */}
                <div className="mb-16">
                    <h3 className="text-4xl font-bold text-center text-white mb-12">Our Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group"
                            >
                                <div className="mb-6">
                                    <h4 className="text-2xl font-bold text-white mb-2">{member.name}</h4>
                                    <p className="text-cyan-400 font-semibold mb-1">{member.role}</p>
                                    <div className="flex items-center text-slate-400 text-sm mb-3">
                                        <MapPinIcon className="h-4 w-4 mr-1" />
                                        {member.location}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="flex items-center text-slate-300 hover:text-cyan-400 transition-colors"
                                    >
                                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                                        <span className="text-sm">{member.email}</span>
                                    </a>

                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-slate-300 hover:text-cyan-400 transition-colors"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        <span className="text-sm">LinkedIn Profile</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
