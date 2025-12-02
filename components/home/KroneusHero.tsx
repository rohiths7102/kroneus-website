'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShieldCheckIcon, RocketLaunchIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const rotatingQuotes = [
    "Innovate Freely. We Secure the Rest.",
    "Build Anything. We Secure Everything.",
    "Design Brilliance. We Defend Integrity.",
    "You Build Dreams. We Build Defenses."
]

export default function EnterpriseKroneusHero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 400], [1, 0])
    const scale = useTransform(scrollY, [0, 400], [1, 0.95])
    const y = useTransform(scrollY, [0, 400], [0, -50])

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % rotatingQuotes.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 relative"
                >
                    <h1
                        className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tight leading-[1.1] pb-10 relative circuit-border-text"
                        style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 40%, #14b8a6 60%, #06b6d4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-shift 8s ease infinite',
                        }}
                    >
                        KRONEUS
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                    className="mb-12 h-32 flex items-center justify-center"
                >
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={currentQuoteIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold px-4 py-8 leading-relaxed"
                            style={{
                                background: 'linear-gradient(135deg, #00bcd4 0%, #10b981 50%, #14b8a6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: '0 0 40px rgba(0,188,212,0.4), 0 0 20px rgba(16,185,129,0.3)',
                                filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.3))',
                            }}
                        >
                            {rotatingQuotes[currentQuoteIndex]}
                        </motion.h2>
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xl md:text-2xl lg:text-3xl text-slate-100 max-w-5xl mx-auto mb-20 leading-relaxed px-4 font-light"
                    style={{
                        textShadow: '0 2px 30px rgba(0,0,0,1), 0 4px 15px rgba(0,0,0,0.8)',
                    }}
                >
                    Governance and defense for autonomous intelligence. Building advanced protection systems for agentic AI and next-generation digital infrastructure.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center mb-24 px-4"
                >
                    <Link
                        href="#contact"
                        className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 rounded-2xl font-bold text-xl text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                        style={{
                            boxShadow: '0 0 60px rgba(6,182,212,0.8), 0 0 100px rgba(16,185,129,0.6), 0 15px 40px rgba(0,0,0,0.7)',
                        }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            Get in Touch
                            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>

                    <Link
                        href="#demo"
                        className="group px-12 py-6 border-2 border-cyan-400 rounded-2xl font-bold text-xl text-cyan-200 hover:bg-cyan-400/20 hover:border-cyan-300 hover:text-white transition-all backdrop-blur-md hover:scale-105"
                        style={{
                            boxShadow: '0 0 40px rgba(6,182,212,0.5), 0 8px 30px rgba(0,0,0,0.5)',
                            background: 'rgba(0, 0, 0, 0.4)',
                        }}
                    >
                        <span className="flex items-center justify-center gap-3">
                            See SELA in Action
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
                >
                    <div
                        className="group p-10 bg-gradient-to-br from-slate-900/95 to-slate-900/70 backdrop-blur-2xl rounded-3xl border border-cyan-500/50 hover:border-cyan-400/80 transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                        style={{ boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 15px 50px rgba(0,0,0,0.6)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <ShieldCheckIcon className="h-16 w-16 text-cyan-400 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(6,182,212,1)]" />
                            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Agentic AI Security</h3>
                            <p className="text-slate-200 text-lg leading-relaxed drop-shadow-md">Real-time protection for autonomous systems</p>
                        </div>
                    </div>

                    <div
                        className="group p-10 bg-gradient-to-br from-slate-900/95 to-slate-900/70 backdrop-blur-2xl rounded-3xl border border-emerald-500/50 hover:border-emerald-400/80 transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                        style={{ boxShadow: '0 0 40px rgba(16,185,129,0.3), 0 15px 50px rgba(0,0,0,0.6)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <RocketLaunchIcon className="h-16 w-16 text-emerald-400 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(16,185,129,1)]" />
                            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Research-Driven</h3>
                            <p className="text-slate-200 text-lg leading-relaxed drop-shadow-md">Rapid prototyping and threat analysis</p>
                        </div>
                    </div>

                    <div
                        className="group p-10 bg-gradient-to-br from-slate-900/95 to-slate-900/70 backdrop-blur-2xl rounded-3xl border border-teal-500/50 hover:border-teal-400/80 transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                        style={{ boxShadow: '0 0 40px rgba(20,184,166,0.3), 0 15px 50px rgba(0,0,0,0.6)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <GlobeAltIcon className="h-16 w-16 text-teal-400 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(20,184,166,1)]" />
                            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Global Operations</h3>
                            <p className="text-slate-200 text-lg leading-relaxed drop-shadow-md">Operating across the UK and Australia</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 15, 0] }}
                transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="w-8 h-14 border-2 border-cyan-400 rounded-full flex justify-center pt-3 backdrop-blur-md bg-black/50 shadow-2xl"
                    style={{ boxShadow: '0 0 30px rgba(6,182,212,0.6), 0 0 50px rgba(6,182,212,0.3)' }}
                >
                    <motion.div
                        className="w-2 h-4 bg-cyan-400 rounded-full"
                        style={{ boxShadow: '0 0 15px rgba(6,182,212,1), 0 0 25px rgba(6,182,212,0.6)' }}
                    />
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                /* SUPER VISIBLE CIRCUIT BORDER - Thick glowing borders with light running around */
                @keyframes circuit-border {
                    0% {
                        -webkit-text-stroke: 4px rgba(6,182,212,1);
                        text-shadow: 
                            -4px -4px 8px rgba(6,182,212,1),
                            -5px -5px 15px rgba(6,182,212,1),
                            -6px -6px 25px rgba(6,182,212,0.9),
                            -8px -8px 40px rgba(6,182,212,0.8),
                            4px 4px 0 rgba(6,182,212,0),
                            0 0 50px rgba(6,182,212,0.4),
                            0 0 80px rgba(6,182,212,0.3);
                    }
                    25% {
                        -webkit-text-stroke: 4px rgba(16,185,129,1);
                        text-shadow: 
                            4px -4px 8px rgba(16,185,129,1),
                            5px -5px 15px rgba(16,185,129,1),
                            6px -6px 25px rgba(16,185,129,0.9),
                            8px -8px 40px rgba(16,185,129,0.8),
                            -4px 4px 0 rgba(6,182,212,0),
                            0 0 50px rgba(16,185,129,0.4),
                            0 0 80px rgba(16,185,129,0.3);
                    }
                    50% {
                        -webkit-text-stroke: 4px rgba(20,184,166,1);
                        text-shadow: 
                            4px 4px 8px rgba(20,184,166,1),
                            5px 5px 15px rgba(20,184,166,1),
                            6px 6px 25px rgba(20,184,166,0.9),
                            8px 8px 40px rgba(20,184,166,0.8),
                            -4px -4px 0 rgba(6,182,212,0),
                            0 0 50px rgba(20,184,166,0.4),
                            0 0 80px rgba(20,184,166,0.3);
                    }
                    75% {
                        -webkit-text-stroke: 4px rgba(6,182,212,1);
                        text-shadow: 
                            -4px 4px 8px rgba(6,182,212,1),
                            -5px 5px 15px rgba(6,182,212,1),
                            -6px 6px 25px rgba(6,182,212,0.9),
                            -8px 8px 40px rgba(6,182,212,0.8),
                            4px -4px 0 rgba(16,185,129,0),
                            0 0 50px rgba(6,182,212,0.4),
                            0 0 80px rgba(6,182,212,0.3);
                    }
                    100% {
                        -webkit-text-stroke: 4px rgba(6,182,212,1);
                        text-shadow: 
                            -4px -4px 8px rgba(6,182,212,1),
                            -5px -5px 15px rgba(6,182,212,1),
                            -6px -6px 25px rgba(6,182,212,0.9),
                            -8px -8px 40px rgba(6,182,212,0.8),
                            4px 4px 0 rgba(6,182,212,0),
                            0 0 50px rgba(6,182,212,0.4),
                            0 0 80px rgba(6,182,212,0.3);
                    }
                }

                .circuit-border-text {
                    -webkit-text-stroke: 4px rgba(6,182,212,0.9);
                    animation: circuit-border 2.5s ease-in-out infinite;
                    paint-order: stroke fill;
                }
            `}</style>
        </section>
    )
}
