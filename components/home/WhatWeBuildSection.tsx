'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, LockClosedIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default function WhatWeBuildSection() {
    return (
        <section id="what-we-build" className="relative py-32 overflow-hidden">
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">KRONEUS</span> Zero Trust Security
                    </h2>
                    <p className="text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
                        Governance and defense for autonomous intelligence
                    </p>
                </motion.div>

                {/* Main Description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 p-10 bg-gradient-to-br from-slate-900/80 to-slate-900/60 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl"
                >
                    <p className="text-xl text-slate-200 leading-relaxed mb-6">
                        KRONEUS is a <span className="text-cyan-400 font-semibold">research-driven zero-trust security organization</span> building advanced protection systems for agentic AI and next-generation digital infrastructure.
                    </p>
                    <p className="text-xl text-slate-200 leading-relaxed">
                        We combine <span className="text-emerald-400 font-semibold">cybersecurity engineering</span>, <span className="text-teal-400 font-semibold">behavioral policy enforcement</span>, and <span className="text-blue-400 font-semibold">intelligent threat analysis</span> to secure emerging AI ecosystems.
                    </p>
                </motion.div>

                {/* Pilot Program Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        We are ready for pilot studies with agentic AI developers in four sectors:
                    </h3>
                </motion.div>

                {/* Four Sectors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {[
                        { name: 'Banking & Finance', icon: '🏦', color: 'from-blue-500 to-cyan-500' },
                        { name: 'Retail & E-Commerce', icon: '🛒', color: 'from-emerald-500 to-teal-500' },
                        { name: 'Autonomous Vehicles & IoT', icon: '🚗', color: 'from-purple-500 to-pink-500' },
                        { name: 'Enterprise IT', icon: '🏢', color: 'from-indigo-500 to-blue-500' },
                    ].map((sector, index) => (
                        <motion.div
                            key={sector.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="group p-8 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all hover:scale-105"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-5xl">{sector.icon}</span>
                                <h4 className="text-2xl font-bold text-white">{sector.name}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Discount Note */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-gradient-to-r from-cyan-900/40 to-emerald-900/40 rounded-2xl border-2 border-cyan-500/50 shadow-2xl"
                >
                    <p className="text-2xl text-cyan-300 font-semibold">
                        🎯 Exclusive initial 3-month discount for pilot partners
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
