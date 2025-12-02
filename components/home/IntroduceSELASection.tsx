'use client'

import { motion } from 'framer-motion'
import { 
    ShieldCheckIcon, 
    BoltIcon, 
    CircleStackIcon, 
    CpuChipIcon,
    ChartBarIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline'

export default function IntroduceSELASection() {
    const selaFeatures = [
        {
            icon: ShieldCheckIcon,
            title: 'AI-Native Security',
            description: 'Built from the ground up to understand and protect autonomous AI agents',
            color: 'text-cyan-400',
            bgColor: 'from-cyan-500/20 to-cyan-500/5'
        },
        {
            icon: BoltIcon,
            title: 'Real-Time Protection',
            description: 'Evaluates and enforces behavioral policies in milliseconds',
            color: 'text-emerald-400',
            bgColor: 'from-emerald-500/20 to-emerald-500/5'
        },
        {
            icon: CircleStackIcon,
            title: '6-Layer Security Architecture',
            description: 'Comprehensive defense spanning input validation to blockchain audit trails',
            color: 'text-blue-400',
            bgColor: 'from-blue-500/20 to-blue-500/5'
        },
        {
            icon: CpuChipIcon,
            title: 'Middleware Design',
            description: 'Seamlessly integrates between AI agents and your infrastructure',
            color: 'text-purple-400',
            bgColor: 'from-purple-500/20 to-purple-500/5'
        },
        {
            icon: ChartBarIcon,
            title: 'ML-Powered Analysis',
            description: 'Advanced behavioral analysis detects anomalies and threats',
            color: 'text-teal-400',
            bgColor: 'from-teal-500/20 to-teal-500/5'
        },
        {
            icon: LockClosedIcon,
            title: 'Policy Enforcement',
            description: 'Strict business logic and compliance rules enforced automatically',
            color: 'text-pink-400',
            bgColor: 'from-pink-500/20 to-pink-500/5'
        }
    ]

    return (
        <section id="meet-sela" className="relative py-32 overflow-hidden">
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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6"
                    >
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 mb-4"
                            style={{
                                textShadow: '0 0 40px rgba(6,182,212,0.4)',
                                filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.4))'
                            }}
                        >
                            Meet SELA
                        </h2>
                    </motion.div>
                    <p className="text-2xl md:text-3xl text-slate-200 max-w-5xl mx-auto font-light leading-relaxed">
                        Security Enforcement Layer for Agentic AI
                    </p>
                </motion.div>

                {/* Main Description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-12 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/40 shadow-2xl"
                    style={{
                        boxShadow: '0 0 80px rgba(6,182,212,0.3), 0 20px 60px rgba(0,0,0,0.7)'
                    }}
                >
                    <p className="text-2xl text-slate-200 leading-relaxed text-center">
                        SELA is an <span className="text-cyan-400 font-bold">AI-native security middleware</span> designed to <span className="text-emerald-400 font-bold">evaluate and enforce behavioral policies in real time</span> for autonomous systems.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selaFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group p-8 bg-gradient-to-br ${feature.bgColor} backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-cyan-500/60 transition-all hover:scale-105 hover:shadow-2xl`}
                        >
                            <feature.icon className={`h-14 w-14 ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`} />
                            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-lg text-slate-300 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Key Differentiator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center p-10 bg-gradient-to-r from-cyan-900/30 via-emerald-900/30 to-teal-900/30 rounded-3xl border border-cyan-500/40"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Why SELA?
                    </h3>
                    <p className="text-xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
                        Traditional security tools can't keep up with autonomous AI. SELA was designed specifically for <span className="text-cyan-400 font-semibold">agentic systems</span> that make independent decisions, requiring <span className="text-emerald-400 font-semibold">behavioral analysis</span>, not just pattern matching.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
