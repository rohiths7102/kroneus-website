'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const securityLayers = [
    { name: 'Input Validation', color: '#00bcd4', icon: '🔍', desc: 'Validates all incoming requests and filters malicious inputs' },
    { name: 'Behavioral Analysis', color: '#10b981', icon: '🧠', desc: 'ML-powered analysis of agent behavior patterns in real-time' },
    { name: 'Policy Enforcement', color: '#f59e0b', icon: '📋', desc: 'Enforces strict business logic and compliance rules' },
    { name: 'Threat Detection', color: '#ef4444', icon: '⚠️', desc: 'Identifies known attack patterns and anomalies' },
    { name: 'Action Filtering', color: '#ec4899', icon: '🛡️', desc: 'Blocks unauthorized actions before execution' },
    { name: 'Audit Logging', color: '#8b5cf6', icon: '📝', desc: 'Immutable blockchain-backed audit trail' },
]

const attackScenarios = [
    {
        name: 'Banking: Wire Transfer Fraud',
        industry: 'Banking',
        description: 'Agent attempts $50,000 wire transfer to suspicious offshore account',
        color: 'from-red-500 to-orange-500',
        icon: '🏦',
        outcome: 'blocked',
        blockedAt: 3,
        reason: 'Suspicious destination account pattern detected. Transfer amount exceeds daily limit without proper authorization chain.',
        threatLevel: 'CRITICAL'
    },
    {
        name: 'Banking: Routine Balance Check',
        industry: 'Banking',
        description: 'Agent queries account balance for authenticated user',
        color: 'from-emerald-500 to-teal-500',
        icon: '🏦',
        outcome: 'allowed',
        reason: 'Valid authenticated request within normal business parameters. User identity verified via A-DNA token.',
        threatLevel: 'SAFE'
    },
    {
        name: 'Banking: Critical Account Update',
        industry: 'Banking',
        description: 'AI agent tries to update customer contact information',
        color: 'from-orange-500 to-yellow-500',
        icon: '🏦',
        outcome: 'auth_required',
        authLevel: 'MFA',
        reason: 'Sensitive data modification requires multi-factor authentication. Zero Trust policy mandates additional verification for PII changes.',
        threatLevel: 'ELEVATED'
    },
    {
        name: 'Retail: Dynamic Pricing Attack',
        industry: 'Retail',
        description: 'Competitor bot manipulating prices to drain profit margins',
        color: 'from-purple-500 to-pink-500',
        icon: '🛒',
        outcome: 'blocked',
        blockedAt: 1,
        reason: 'Anomalous pricing pattern detected. Price change velocity exceeds acceptable thresholds. Behavioral analysis identified bot-like activity.',
        threatLevel: 'CRITICAL'
    },
    {
        name: 'Retail: Product Info Lookup',
        industry: 'Retail',
        description: 'Agent retrieves product details and availability',
        color: 'from-blue-400 to-cyan-400',
        icon: '🛒',
        outcome: 'allowed',
        reason: 'Standard read-only operation within API rate limits. No sensitive data accessed.',
        threatLevel: 'SAFE'
    },
    {
        name: 'Retail: Bulk Inventory Update',
        industry: 'Retail',
        description: 'Agent requests inventory adjustment across 500 SKUs',
        color: 'from-pink-500 to-rose-500',
        icon: '🛒',
        outcome: 'auth_required',
        authLevel: 'MANAGER_APPROVAL',
        reason: 'Bulk operation affecting financial records. Policy requires manager approval for inventory changes >100 units.',
        threatLevel: 'ELEVATED'
    },
    {
        name: 'Fleet: Remote Command Injection',
        industry: 'Autonomous Vehicles',
        description: 'Malicious command attempting to unlock all vehicle doors remotely',
        color: 'from-blue-500 to-cyan-500',
        icon: '🚗',
        outcome: 'blocked',
        blockedAt: 2,
        reason: 'Command signature mismatch. Source IP not in authorized fleet management range. Potential vehicle hijacking attempt.',
        threatLevel: 'CRITICAL'
    },
    {
        name: 'Fleet: Firmware Update Request',
        industry: 'Autonomous Vehicles',
        description: 'Agent requests critical firmware update for vehicle fleet',
        color: 'from-cyan-500 to-teal-500',
        icon: '🚗',
        outcome: 'auth_required',
        authLevel: 'HARDWARE_VERIFICATION',
        reason: 'Critical system modification requires hardware-backed cryptographic verification. Supply chain validation needed.',
        threatLevel: 'ELEVATED'
    },
    {
        name: 'Enterprise: Privilege Escalation',
        industry: 'Enterprise IT',
        description: 'Helpdesk bot attempting to grant admin access without MFA',
        color: 'from-indigo-500 to-purple-500',
        icon: '🏢',
        outcome: 'blocked',
        blockedAt: 4,
        reason: 'MFA validation failed. Privilege escalation attempt detected without proper authorization workflow. User context anomaly identified.',
        threatLevel: 'CRITICAL'
    },
    {
        name: 'Enterprise: Public RDP Exposure',
        industry: 'Enterprise IT',
        description: 'AI suggests opening port 3389 (RDP) to public internet',
        color: 'from-violet-500 to-purple-500',
        icon: '🏢',
        outcome: 'blocked',
        blockedAt: 2,
        reason: 'Security policy violation. RDP exposure to public internet flagged as high-risk configuration. Zero Trust architecture prohibits direct external access.',
        threatLevel: 'CRITICAL'
    },
]

export default function InteractiveSecurityDemo() {
    const [selectedAttack, setSelectedAttack] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [currentLayer, setCurrentLayer] = useState(0)
    const [showOutcome, setShowOutcome] = useState(false)

    const simulationButtonRef = useRef<HTMLDivElement>(null)
    const attackVisualizationRef = useRef<HTMLDivElement>(null)

    const currentScenario = attackScenarios[selectedAttack]

    const handleScenarioSelect = (index: number) => {
        setSelectedAttack(index)
        resetDemo()

        setTimeout(() => {
            if (simulationButtonRef.current) {
                const elementPosition = simulationButtonRef.current.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - 100
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        }, 300)
    }

    useEffect(() => {
        if (isRunning && !showOutcome) {
            const timer = setTimeout(() => {
                if (currentLayer < securityLayers.length - 1) {
                    if (currentScenario.outcome === 'blocked' && currentLayer + 1 === currentScenario.blockedAt) {
                        setShowOutcome(true)
                    } else if (currentScenario.outcome === 'auth_required' && currentLayer === 2) {
                        setShowOutcome(true)
                    } else if (currentScenario.outcome === 'allowed' && currentLayer === securityLayers.length - 2) {
                        setShowOutcome(true)
                    } else {
                        setCurrentLayer(currentLayer + 1)
                    }
                } else {
                    setShowOutcome(true)
                }
            }, 800)

            return () => clearTimeout(timer)
        }
    }, [isRunning, currentLayer, showOutcome, currentScenario])

    const startDemo = () => {
        setIsRunning(true)
        setCurrentLayer(0)
        setShowOutcome(false)

        setTimeout(() => {
            if (attackVisualizationRef.current) {
                const elementPosition = attackVisualizationRef.current.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - 100
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        }, 500)
    }

    const resetDemo = () => {
        setIsRunning(false)
        setCurrentLayer(0)
        setShowOutcome(false)
    }

    return (
        <section id="demo" className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        See SELA in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Action</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Interactive Security Demo
                    </p>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-2">
                        Watch SELA's 6-layer security model analyze, block, and authenticate requests across 4 industries in real-time
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {attackScenarios.map((scenario, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleScenarioSelect(index)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 text-left relative overflow-hidden ${selectedAttack === index
                                ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-2xl'
                                : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                                }`}
                        >
                            <div className="absolute top-2 right-2">
                                {scenario.outcome === 'blocked' && (
                                    <span className="px-2 py-1 text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/50 rounded">BLOCKED</span>
                                )}
                                {scenario.outcome === 'auth_required' && (
                                    <span className="px-2 py-1 text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded">AUTH REQ</span>
                                )}
                                {scenario.outcome === 'allowed' && (
                                    <span className="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded">ALLOWED</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">{scenario.icon}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{scenario.industry}</h4>
                            <p className="text-sm text-slate-300">{scenario.description}</p>
                        </motion.button>
                    ))}
                </div>

                <div ref={attackVisualizationRef} className="mb-12 p-8 bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-cyan-500/30">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">SELA's 6-Layer Security Architecture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {securityLayers.map((layer, index) => {
                            const isActive = isRunning && currentLayer >= index
                            const isCurrentLayer = isRunning && currentLayer === index
                            const isDecisionPoint = showOutcome && currentLayer === index

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0.5, scale: 0.95 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0.5,
                                        scale: isCurrentLayer ? 1.05 : 1,
                                    }}
                                    className={`p-6 rounded-2xl border-2 transition-all ${isDecisionPoint && currentScenario.outcome === 'blocked'
                                        ? 'border-red-500 bg-red-500/20 shadow-2xl'
                                        : isDecisionPoint && currentScenario.outcome === 'auth_required'
                                            ? 'border-yellow-500 bg-yellow-500/20 shadow-2xl'
                                            : isDecisionPoint && currentScenario.outcome === 'allowed'
                                                ? 'border-emerald-500 bg-emerald-500/20 shadow-2xl'
                                                : isCurrentLayer
                                                    ? 'border-cyan-400 bg-cyan-500/20 shadow-2xl'
                                                    : isActive
                                                        ? 'border-emerald-500 bg-emerald-500/10'
                                                        : 'border-slate-700 bg-slate-900/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl">{layer.icon}</span>
                                        <h4 className="text-lg font-bold text-white">
                                            Layer {index + 1}: {layer.name}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-slate-300">{layer.desc}</p>
                                    {isCurrentLayer && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 0.8 }}
                                            className="mt-3 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                        />
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {showOutcome && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="mb-12"
                        >
                            {currentScenario.outcome === 'blocked' && (
                                <div className="p-10 bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-3xl border-2 border-red-500 text-center relative overflow-hidden">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20"
                                    />
                                    <div className="relative z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <h3 className="text-5xl font-bold text-red-300 mb-4">
                                                🛡️ THREAT BLOCKED
                                            </h3>
                                        </motion.div>
                                        <p className="text-2xl text-slate-200 mb-4">
                                            Stopped at Layer {currentLayer + 1}: {securityLayers[currentLayer].name}
                                        </p>
                                        <div className="mt-6 p-6 bg-black/30 rounded-2xl border border-red-500/30">
                                            <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">THREAT ANALYSIS</p>
                                            <p className="text-lg text-slate-200 leading-relaxed">{currentScenario.reason}</p>
                                            <div className="mt-4 inline-block px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
                                                <span className="text-red-400 font-bold">RISK LEVEL: {currentScenario.threatLevel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentScenario.outcome === 'auth_required' && (
                                <div className="p-10 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-3xl border-2 border-yellow-500 text-center relative overflow-hidden">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.2, 0.4, 0.2]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20"
                                    />
                                    <div className="relative z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <h3 className="text-5xl font-bold text-yellow-300 mb-4">
                                                🔐 AUTHENTICATION REQUIRED
                                            </h3>
                                        </motion.div>
                                        <p className="text-2xl text-slate-200 mb-4">
                                            Zero Trust Validation at Layer {currentLayer + 1}
                                        </p>
                                        <div className="mt-6 p-6 bg-black/30 rounded-2xl border border-yellow-500/30">
                                            <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">SECURITY POLICY</p>
                                            <p className="text-lg text-slate-200 leading-relaxed mb-4">{currentScenario.reason}</p>
                                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                                <div className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                                                    <span className="text-yellow-400 font-bold">AUTH TYPE: {currentScenario.authLevel}</span>
                                                </div>
                                                <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg">
                                                    <span className="text-orange-400 font-bold">RISK LEVEL: {currentScenario.threatLevel}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentScenario.outcome === 'allowed' && (
                                <div className="p-10 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-3xl border-2 border-emerald-500 text-center relative overflow-hidden">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.2, 0.4, 0.2]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
                                    />
                                    <div className="relative z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <h3 className="text-5xl font-bold text-emerald-300 mb-4">
                                                ✅ REQUEST ALLOWED
                                            </h3>
                                        </motion.div>
                                        <p className="text-2xl text-slate-200 mb-4">
                                            Validated Through All Security Layers
                                        </p>
                                        <div className="mt-6 p-6 bg-black/30 rounded-2xl border border-emerald-500/30">
                                            <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">VALIDATION SUMMARY</p>
                                            <p className="text-lg text-slate-200 leading-relaxed">{currentScenario.reason}</p>
                                            <div className="mt-4 inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                                                <span className="text-emerald-400 font-bold">RISK LEVEL: {currentScenario.threatLevel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={simulationButtonRef} className="flex flex-col sm:flex-row gap-6 justify-center">
                    <motion.button
                        onClick={startDemo}
                        disabled={isRunning}
                        whileHover={{ scale: isRunning ? 1 : 1.05 }}
                        whileTap={{ scale: isRunning ? 1 : 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold text-xl rounded-2xl transition-all disabled:cursor-not-allowed relative overflow-hidden"
                    >
                        {isRunning && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                        <span className="relative z-10">
                            {isRunning ? 'Running Simulation...' : 'Start Security Simulation'}
                        </span>
                    </motion.button>
                    <motion.button
                        onClick={resetDemo}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xl rounded-2xl transition-all"
                    >
                        Reset
                    </motion.button>
                </div>
            </div>
        </section>
    )
}
