'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    ShieldCheckIcon,
    BeakerIcon,
    RocketLaunchIcon,
    CheckCircleIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'
import Card3DTilt from '@/components/premium/Card3DTilt'

const coreValues = [
    {
        icon: ShieldCheckIcon,
        title: 'Security First',
        description: 'Advanced protection systems built for the future threat landscape',
        color: 'from-primary-500 to-primary-600',
    },
    {
        icon: BeakerIcon,
        title: 'Research-Driven',
        description: 'Experimentation and rapid prototyping to stay ahead of emerging threats',
        color: 'from-accent-blue to-blue-600',
    },
    {
        icon: RocketLaunchIcon,
        title: 'Innovation Focus',
        description: 'Building next-generation defense technology for autonomous systems',
        color: 'from-accent-teal to-teal-600',
    },
]

const capabilities = [
    'Real-time policy enforcement for agentic AI',
    'Behavioural policy enforcement and scoring',
    'Advanced threat analysis and detection',
    'AI governance and compliance frameworks',
    'Exploit and fraud mitigation systems',
    'Secure policy architecture design',
]

export default function KroneusCompany() {
    return (
        <section className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Company Overview - uses parent data-section="company" */}
                <div className="py-20">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                        >
                            About KRONEUS
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
                        >
                            A research-driven security organization focused on building advanced protection systems for agentic AI and next-generation digital infrastructure.
                        </motion.p>
                    </div>

                    {/* Company Taglines */}
                    <div data-section="taglines" className="py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {[
                                'Innovate Freely. We Secure the Rest.',
                                'Build Anything. We Secure Everything.',
                                'Design Brilliance. We Defend Integrity.',
                                'You Build Dreams. We Build Defense.',
                            ].map((tagline, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-white/20"
                                >
                                    <p className="text-xl md:text-2xl font-bold text-white text-center">
                                        {tagline}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* SELA Service Description */}
                    <div data-section="services" className="py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold mb-6 flex items-center text-white">
                                <ShieldCheckIcon className="h-10 w-10 text-emerald-400 mr-3" />
                                We Provide AI Security Services Using SELA
                            </h3>
                            <p className="text-xl text-slate-200 mb-6 leading-relaxed">
                                KRONEUS delivers comprehensive security for agentic AI developers and organizations across critical industries. Using SELA, our flagship AI-native security platform, we protect autonomous systems in:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg text-white">Banking & Finance</h4>
                                        <p className="text-slate-300 text-sm">Customer service automation, fraud detection, regulatory compliance</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg text-white">Retail & E-Commerce</h4>
                                        <p className="text-slate-300 text-sm">Dynamic pricing, inventory management, customer service</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg text-white">Autonomous Vehicles</h4>
                                        <p className="text-slate-300 text-sm">Fleet command, remote diagnostics, safety-critical operations</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg text-white">Enterprise IT</h4>
                                        <p className="text-slate-300 text-sm">Helpdesk automation, HR processes, configuration management</p>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/products"
                                className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all"
                            >
                                Explore SELA
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mission Statement */}
                    <div data-section="mission" className="py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="card bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <CheckCircleIcon className="h-8 w-8 text-orange-400 mr-3" />
                                Our Mission
                            </h3>
                            <p className="text-lg text-slate-200 leading-relaxed mb-6">
                                We ensure that autonomous and AI-enabled systems operate safely and securely in real environments. As AI grows more capable, the risks grow with it. KRONEUS develops protection tools that safeguard decision engines, AI models, and high-value applications from manipulation, fraud, exploitation, and emerging adversarial behaviour.
                            </p>
                            <p className="text-lg text-slate-200 leading-relaxed">
                                Our work is centered on reliability, safety, and strong operational standards. We bring together cybersecurity engineering, policy-driven control, and intelligent threat analysis to create resilient defense technology built for the future.
                            </p>
                        </motion.div>
                    </div>

                    {/* Core Values */}
                    <div data-section="values" className="py-20">
                        <h3 className="text-3xl font-bold text-white mb-10 text-center">
                            Core Values
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {coreValues.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card3DTilt>
                                        <div className="card h-full bg-white/10 backdrop-blur-sm border border-white/20 hover:shadow-glow-lg transition-all duration-300">
                                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} p-4 mb-6`}>
                                                <value.icon className="w-full h-full text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-3">
                                                {value.title}
                                            </h4>
                                            <p className="text-slate-300">
                                                {value.description}
                                            </p>
                                        </div>
                                    </Card3DTilt>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Capabilities */}
                    <div data-section="capabilities" className="py-20">
                        <h3 className="text-3xl font-bold text-white mb-8 text-center">
                            Our Capabilities
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {capabilities.map((capability, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start space-x-3"
                                >
                                    <CheckCircleIcon className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-200">{capability}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Vision */}
                    <div data-section="vision" className="py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold text-white mb-6">
                                Our Vision
                            </h3>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                                To shape the security frameworks that will protect the next intelligence era. KRONEUS is committed to creating strong, reliable, and forward-thinking defense technology that safeguards the world's future systems.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
