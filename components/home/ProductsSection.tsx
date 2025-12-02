'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const products = [
    {
        id: 'banking',
        name: 'Banking & Finance',
        icon: '🏦',
        shortDesc: 'Customer service automation, fraud detection, regulatory compliance',
        fullDesc: `SELA provides comprehensive protection for banking AI agents handling sensitive financial operations:

• **Transaction Monitoring**: Real-time analysis of all wire transfers, account modifications, and high-value transactions
• **Fraud Detection**: ML-powered behavioral analysis detects anomalous patterns indicative of fraud
• **Regulatory Compliance**: Automatic enforcement of KYC, AML, and SOX compliance policies
• **PII Protection**: Strict access controls prevent unauthorized export of customer data
• **Multi-Factor Authentication**: Human-in-the-loop approval for critical financial decisions
• **Audit Trail**: Immutable blockchain-backed logs for regulatory reporting

Common threats blocked:
- Unauthorized wire transfers to suspicious accounts
- Account data exfiltration attempts
- Privilege escalation attacks
- Social engineering attempts on AI agents
- Policy violations in automated loan processing`,
        color: 'from-blue-500 to-cyan-500',
        borderColor: 'border-blue-500/50 hover:border-blue-400/80',
    },
    {
        id: 'retail',
        name: 'Retail & E-Commerce',
        icon: '🛒',
        shortDesc: 'Dynamic pricing, inventory management, customer service agents',
        fullDesc: `SELA secures retail AI agents managing pricing, inventory, and customer interactions:

• **Dynamic Pricing Protection**: Prevents competitor bots from manipulating pricing algorithms
• **Inventory Control**: Enforces approval workflows for large inventory adjustments
• **Customer Data Security**: Protects sensitive shopping history and payment information
• **Promotional Guardrails**: Validates discount and promotion logic to prevent profit drain
• **Supply Chain Integrity**: Monitors AI decisions affecting supplier relationships
• **Fraud Prevention**: Detects and blocks fraudulent return/refund requests

Common threats blocked:
- Adversarial pricing manipulation attacks
- Unauthorized bulk inventory adjustments
- Customer PII exposure in chatbot responses
- Promotional code abuse by AI agents
- Supply chain disruption attempts`,
        color: 'from-emerald-500 to-teal-500',
        borderColor: 'border-emerald-500/50 hover:border-emerald-400/80',
    },
    {
        id: 'autonomous',
        name: 'Autonomous Vehicles & IoT',
        icon: '🚗',
        shortDesc: 'Fleet command, remote diagnostics, safety-critical operations',
        fullDesc: `SELA provides safety-critical protection for autonomous vehicle control systems:

• **Command Validation**: Verifies all remote commands affecting vehicle behavior
• **Safety Boundaries**: Enforces operational limits on speed, routes, and maneuvers
• **Firmware Protection**: Requires multi-level approval for critical system updates
• **Fleet Management**: Secures AI decisions affecting multiple vehicles simultaneously
• **Physical Security**: Prevents unauthorized access to doors, locks, and security systems
• **Diagnostic Integrity**: Validates AI-driven maintenance and repair decisions

Common threats blocked:
- Remote command injection attempts
- Unauthorized door unlock commands
- Malicious firmware updates
- Safety limit violations
- Fleet-wide attack vectors
- Sensor spoofing attempts`,
        color: 'from-purple-500 to-pink-500',
        borderColor: 'border-purple-500/50 hover:border-purple-400/80',
    },
    {
        id: 'enterprise',
        name: 'Enterprise IT',
        icon: '🏢',
        shortDesc: 'Helpdesk automation, HR processes, configuration management',
        fullDesc: `SELA protects enterprise IT infrastructure managed by AI agents:

• **Access Control**: Enforces MFA and approval workflows for privilege changes
• **Configuration Management**: Validates infrastructure changes before execution
• **Network Security**: Prevents dangerous firewall and network configuration changes
• **Identity Management**: Secures AI-driven user provisioning and de-provisioning
• **Compliance Enforcement**: Ensures IT changes meet security and regulatory requirements
• **Incident Response**: Monitors AI actions during security incident handling

Common threats blocked:
- Unauthorized admin privilege grants
- Dangerous network configuration changes (opening RDP to internet)
- Bulk user account modifications
- Critical system changes without approval
- Security policy bypasses
- Automated responses to social engineering`,
        color: 'from-indigo-500 to-blue-500',
        borderColor: 'border-indigo-500/50 hover:border-indigo-400/80',
    },
]

export default function ProductsSection() {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <section id="products" className="relative py-32 overflow-hidden">
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
                        What <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">SELA</span> Secures
                    </h2>
                    <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
                        Industry-specific protection for autonomous AI across four critical sectors
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-xl rounded-2xl border-2 ${product.borderColor} transition-all hover:shadow-2xl overflow-hidden`}
                        >
                            {/* Card Header - Always Visible */}
                            <button
                                onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                                className="w-full p-8 text-left transition-colors hover:bg-white/5"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-5xl">{product.icon}</span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedId === product.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDownIcon className="h-8 w-8 text-cyan-400" />
                                    </motion.div>
                                </div>
                                <p className="text-lg text-slate-300">{product.shortDesc}</p>
                            </button>

                            {/* Expanded Description - INTERNAL SCROLL */}
                            <AnimatePresence>
                                {expandedId === product.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        {/* SCROLLABLE CONTAINER - INTERNAL ONLY */}
                                        <div 
                                            className="px-8 pb-8 max-h-96 overflow-y-auto scroll-smooth"
                                            style={{
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: '#06b6d4 #1e293b'
                                            }}
                                        >
                                            <div className={`p-6 bg-gradient-to-br ${product.color} bg-opacity-10 rounded-xl border border-slate-700/50`}>
                                                <div className="prose prose-invert prose-lg max-w-none">
                                                    {product.fullDesc.split('\n').map((line, i) => {
                                                        if (line.startsWith('•')) {
                                                            return <p key={i} className="text-slate-200 mb-3">{line}</p>
                                                        } else if (line.trim() === '') {
                                                            return <div key={i} className="h-2" />
                                                        } else {
                                                            return <p key={i} className="text-slate-100 font-semibold mb-4">{line}</p>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Custom Scrollbar Styles */}
                                        <style jsx>{`
                                            div::-webkit-scrollbar {
                                                width: 8px;
                                            }
                                            div::-webkit-scrollbar-track {
                                                background: rgba(30, 41, 59, 0.5);
                                                border-radius: 4px;
                                            }
                                            div::-webkit-scrollbar-thumb {
                                                background: #06b6d4;
                                                border-radius: 4px;
                                            }
                                            div::-webkit-scrollbar-thumb:hover {
                                                background: #0891b2;
                                            }
                                        `}</style>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
