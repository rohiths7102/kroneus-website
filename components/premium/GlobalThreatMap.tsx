'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GlobalThreatMap() {
  const [threats, setThreats] = useState<Array<{ id: number; x: number; y: number; country: string; type: string }>>([])
  const [blockedCount, setBlockedCount] = useState(0)
  const [activeThreats, setActiveThreats] = useState(0)

  const attackTypes = ['Prompt Injection', 'Data Exfiltration', 'Model Poisoning', 'Privilege Escalation', 'Supply Chain Attack']
  const countries = ['Russia', 'China', 'North Korea', 'Iran', 'Unknown']

  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        country: countries[Math.floor(Math.random() * countries.length)],
        type: attackTypes[Math.floor(Math.random() * attackTypes.length)]
      }
      setThreats(prev => [...prev, newThreat])
      setActiveThreats(prev => prev + 1)

      setTimeout(() => {
        setThreats(prev => prev.filter(t => t.id !== newThreat.id))
        setBlockedCount(prev => prev + 1)
        setActiveThreats(prev => prev - 1)
      }, 3000)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Global Threat <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Defense Grid</span>
          </h2>
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
            Real-time threat detection and autonomous response across your entire AI infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-2xl border-2 border-red-500/30 backdrop-blur-xl"
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-red-500 mb-2">{blockedCount}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Threats Blocked</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-2xl border-2 border-orange-500/30 backdrop-blur-xl"
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-orange-500 mb-2">{activeThreats}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Active Threats</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-xl"
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-emerald-500 mb-2">73%</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Attack Surface Coverage</div>
            </div>
          </motion.div>
        </div>

        {/* Threat Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[500px] bg-gradient-to-br from-slate-950/95 to-black/95 rounded-3xl border-2 border-cyan-500/20 overflow-hidden backdrop-blur-xl"
        >
          {/* World Map Overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <path d="M 100 250 Q 200 200 300 250 T 500 250 T 700 250 T 900 250" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" fill="none" />
              <path d="M 150 200 Q 250 150 350 200 T 550 200 T 750 200" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" fill="none" />
              <path d="M 100 300 Q 200 350 300 300 T 500 300 T 700 300 T 900 300" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Scanning Lines */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundImage: [
                'linear-gradient(0deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
                'linear-gradient(0deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)'
              ],
              backgroundPosition: ['0 0', '0 100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundSize: '100% 20px'
            }}
          />

          {/* Threats */}
          {threats.map(threat => (
            <motion.div
              key={threat.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 3 }}
              className="absolute"
              style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
            >
              <div className="relative">
                {/* Threat Indicator */}
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                
                {/* Expanding Rings */}
                <motion.div
                  animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-red-500 rounded-full"
                />

                {/* Threat Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-6 left-6 bg-slate-900/95 px-3 py-2 rounded-lg border border-red-500/50 backdrop-blur-sm whitespace-nowrap"
                >
                  <div className="text-xs text-red-400 font-bold">{threat.type}</div>
                  <div className="text-[10px] text-slate-500">{threat.country}</div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Center Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(6, 182, 212, 0.5)',
                  '0 0 60px rgba(6, 182, 212, 0.8)',
                  '0 0 30px rgba(6, 182, 212, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-cyan-400/50"
            >
              <span className="text-4xl">🛡️</span>
            </motion.div>
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 p-4 border-t border-cyan-500/30">
            <div className="grid grid-cols-5 gap-4 text-center">
              {attackTypes.map((type, i) => (
                <div key={type} className="flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-red-500' : 'bg-orange-500'} animate-pulse`} />
                  <span className="text-xs text-slate-400">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Protection Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: '🎯', title: 'Multi-Layer Defense', desc: '9-layer security architecture' },
            { icon: '⚡', title: 'Real-Time Response', desc: 'Sub-50ms threat detection' },
            { icon: '🔒', title: 'Zero Trust Validation', desc: 'Continuous authentication' }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-950/70 rounded-2xl border border-cyan-500/20 backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
