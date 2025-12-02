'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, BoltIcon, EyeIcon, LockClosedIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'
import UnifiedCyberBackground from '@/components/premium/UnifiedCyberBackground'

const selaFeatures = [
    {
        icon: ShieldCheckIcon,
        title: 'Input Validation',
        description: 'AI-powered request validation and malicious input filtering',
        color: 'from-cyan-500 to-teal-500',
        borderColor: 'border-cyan-500/40',
    },
    {
        icon: BoltIcon,
        title: 'Behavioral Analysis',
        description: 'ML-powered real-time analysis of agent behavior patterns',
        color: 'from-emerald-500 to-green-500',
        borderColor: 'border-emerald-500/40',
    },
    {
        icon: LockClosedIcon,
        title: 'Policy Enforcement',
        description: 'Strict business logic and compliance rule enforcement',
        color: 'from-teal-500 to-cyan-500',
        borderColor: 'border-teal-500/40',
    },
    {
        icon: EyeIcon,
        title: 'Threat Detection',
        description: 'Identifies attack patterns and anomalies in real-time',
        color: 'from-blue-500 to-cyan-500',
        borderColor: 'border-blue-500/40',
    },
    {
        icon: ChartBarIcon,
        title: 'Action Filtering',
        description: 'Blocks unauthorized actions before execution',
        color: 'from-purple-500 to-pink-500',
        borderColor: 'border-purple-500/40',
    },
    {
        icon: ClockIcon,
        title: 'Audit Logging',
        description: 'Immutable blockchain-backed audit trail',
        color: 'from-violet-500 to-purple-500',
        borderColor: 'border-violet-500/40',
    },
]

export default function MeetSELASection() {
    return (
        <section id="meet-sela" className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
            {/* Same unified cyber background as hero - creates seamless transition */}
            <div className="absolute inset-0">
                <UnifiedCyberBackground variant="section" intensity="low" />
            </div>

            {/* Gradient overlay for smooth transition from hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            {/* Soft top fade for seamless blend with hero scroll */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.h2
                        className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight pb-4"
                        style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #14b8a6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 100px rgba(6,182,212,0.8), 0 0 60px rgba(16,185,129,0.7)',
                            filter: 'drop-shadow(0 0 50px rgba(6,182,212,0.7)) drop-shadow(0 0 25px rgba(16,185,129,0.5))',
                        }}
                    >
                        Meet SELA
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
                        style={{
                            textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 10px rgba(0,0,0,0.7)',
                        }}
                    >
                        Six-layer AI-native security architecture designed to evaluate and enforce behavioral policies in real time
                    </motion.p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {selaFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: 'easeOut',
                            }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`group relative p-8 rounded-2xl border ${feature.borderColor} bg-gradient-to-br from-slate-900/90 to-slate-900/60 backdrop-blur-xl transition-all duration-300`}
                            style={{
                                boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 10px 50px rgba(0,0,0,0.4)',
                            }}
                        >
                            {/* Card glow on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${feature.color.split(' ')[1].replace('to-', 'rgba(')} / 0.1), transparent 70%)`,
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center">
                                        <feature.icon className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-200 leading-relaxed drop-shadow-md">
                                    {feature.description}
                                </p>

                                {/* Corner accent */}
                                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br ${feature.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <a
                        href="#demo"
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 rounded-xl font-bold text-lg text-white overflow-hidden transition-all hover:scale-105"
                        style={{
                            boxShadow: '0 0 50px rgba(6,182,212,0.6), 0 0 80px rgba(16,185,129,0.4), 0 10px 35px rgba(0,0,0,0.6)',
                        }}
                    >
                        <span className="relative z-10">See SELA in Action</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Bottom fade for next section transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    )
}
