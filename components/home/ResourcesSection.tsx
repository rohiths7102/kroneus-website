'use client'

import { motion } from 'framer-motion'
import { DocumentTextIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const resources = [
    {
        icon: DocumentTextIcon,
        title: 'Technical Whitepaper',
        description: 'Deep dive into SELA\'s nine-layer security architecture',
        color: 'from-purple-500 to-violet-500',
    },
    {
        icon: AcademicCapIcon,
        title: 'Research Papers',
        description: 'Academic publications on agentic AI security and threat analysis',
        color: 'from-violet-500 to-purple-500',
    },
    {
        icon: CodeBracketIcon,
        title: 'Integration Guides',
        description: 'OpenAPI specs and developer documentation for quick integration',
        color: 'from-fuchsia-500 to-purple-500',
    },
]

export default function ResourcesSection() {
    return (
        <section id="resources" className="relative py-32 overflow-hidden">
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">Resources</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Technical documentation, research, and integration guides to help you understand and implement SELA
                    </p>
                </motion.div>

                {/* Resource Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {resources.map((resource, index) => (
                        <motion.div
                            key={resource.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all group cursor-pointer"
                            style={{ boxShadow: '0 0 30px rgba(168,85,247,0.1)' }}
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${resource.color} p-4 mb-6 group-hover:scale-110 transition-transform`}>
                                <resource.icon className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{resource.title}</h3>
                            <p className="text-slate-400 mb-6">{resource.description}</p>
                            <span className="text-purple-400 font-semibold group-hover:underline">
                                Learn More →
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold text-lg rounded-lg hover:scale-105 transition-transform"
                        style={{ boxShadow: '0 0 40px rgba(168,85,247,0.5)' }}
                    >
                        Request Full Documentation
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
