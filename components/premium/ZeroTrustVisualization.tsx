'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ZeroTrustVisualization() {
  const [threats, setThreats] = useState<Array<{ id: number; x: number; y: number; blocked: boolean }>>([])
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        x: Math.random() * 100,
        y: -10,
        blocked: false
      }
      setThreats(prev => [...prev, newThreat])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => 
        prev.map(threat => ({
          ...threat,
          y: threat.y + 2,
          blocked: threat.y > 20 && threat.y < 80
        })).filter(threat => threat.y < 110)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % 6)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const layers = [
    { name: 'Identity Layer', color: '#06b6d4', icon: '🔐' },
    { name: 'Policy Engine', color: '#10b981', icon: '📋' },
    { name: 'Threat Detection', color: '#3b82f6', icon: '🛡️' },
    { name: 'Behavioral Analysis', color: '#8b5cf6', icon: '🧠' },
    { name: 'Data Protection', color: '#ec4899', icon: '🔒' },
    { name: 'Audit Trail', color: '#f59e0b', icon: '📊' }
  ]

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Zero Trust Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">In Action</span>
          </h2>
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
            Watch how SELA's 6-layer security system blocks threats in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visualization */}
          <div className="relative h-[600px] bg-gradient-to-br from-slate-900/80 to-slate-950/80 rounded-3xl border-2 border-cyan-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            
            {/* Security Layers */}
            {layers.map((layer, index) => (
              <motion.div
                key={layer.name}
                className="absolute left-0 right-0 h-20 border-t-2 border-dashed"
                style={{
                  top: `${index * 16 + 10}%`,
                  borderColor: layer.color,
                  opacity: activeLayer === index ? 1 : 0.3
                }}
                animate={{
                  boxShadow: activeLayer === index 
                    ? `0 0 30px ${layer.color}80` 
                    : 'none'
                }}
              >
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ 
                    backgroundColor: `${layer.color}20`,
                    border: `2px solid ${layer.color}`,
                    color: layer.color
                  }}
                >
                  {layer.icon} {layer.name}
                </div>
              </motion.div>
            ))}

            {/* Threats */}
            {threats.map(threat => (
              <motion.div
                key={threat.id}
                className="absolute w-6 h-6 rounded-full"
                style={{
                  left: `${threat.x}%`,
                  top: `${threat.y}%`,
                  backgroundColor: threat.blocked ? '#10b981' : '#ef4444'
                }}
                animate={{
                  scale: threat.blocked ? [1, 1.5, 0] : 1,
                  opacity: threat.blocked ? [1, 1, 0] : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {threat.blocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 2, 0] }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-full border-4 border-emerald-400"
                  />
                )}
              </motion.div>
            ))}

            {/* Stats */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 rounded-xl p-4 border border-cyan-500/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-400">{threats.filter(t => t.blocked).length}</div>
                  <div className="text-xs text-slate-400">Blocked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">6</div>
                  <div className="text-xs text-slate-400">Layers Active</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">&lt;50ms</div>
                  <div className="text-xs text-slate-400">Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/70 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all"
                animate={{
                  borderColor: activeLayer === index ? layer.color : undefined,
                  boxShadow: activeLayer === index ? `0 0 20px ${layer.color}40` : undefined
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${layer.color}20` }}
                  >
                    {layer.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{layer.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {index === 0 && "Validates every identity before granting access"}
                      {index === 1 && "Enforces security policies in real-time"}
                      {index === 2 && "Detects and blocks threats automatically"}
                      {index === 3 && "Analyzes behavior patterns for anomalies"}
                      {index === 4 && "Encrypts and protects sensitive data"}
                      {index === 5 && "Creates tamper-proof audit logs"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
