'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheckIcon,
  ScaleIcon,
  DocumentCheckIcon,
  CpuChipIcon,
  LockClosedIcon,
  ClipboardDocumentCheckIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const LAYERS = [
  {
    id: 'identity',
    number: 1,
    name: 'Identity & Session Control',
    icon: ShieldCheckIcon,
    color: '#3b82f6',
    description: 'JWT validation, device fingerprinting, rate limiting'
  },
  {
    id: 'policy',
    number: 2,
    name: 'Policy Decision & Enforcement',
    icon: ScaleIcon,
    color: '#8b5cf6',
    description: 'Rule-based access control and approval workflows'
  },
  {
    id: 'schema',
    number: 3,
    name: 'Schema Enforcement',
    icon: DocumentCheckIcon,
    color: '#f59e0b',
    description: 'Request structure validation and data integrity'
  },
  {
    id: 'rtd',
    number: 4,
    name: 'Runtime Threat Detection',
    icon: CpuChipIcon,
    color: '#ef4444',
    description: 'ML-powered anomaly detection and risk scoring'
  },
  {
    id: 'enclave',
    number: 5,
    name: 'Confidential Compute',
    icon: LockClosedIcon,
    color: '#10b981',
    description: 'Secure enclave for sensitive data operations'
  },
  {
    id: 'audit',
    number: 6,
    name: 'Tamper-Evident Audit',
    icon: ClipboardDocumentCheckIcon,
    color: '#6b7280',
    description: 'Cryptographic logging and event chain'
  }
]

export default function ProductTour() {
  const [scenarios, setScenarios] = useState<any[]>([])
  const [selectedScenario, setSelectedScenario] = useState<any>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentLayer, setCurrentLayer] = useState(-1)
  const [userDecision, setUserDecision] = useState<string | null>(null)
  const [showExplainability, setShowExplainability] = useState(false)

  useEffect(() => {
    fetch('/data/scenarios.json')
      .then(res => res.json())
      .then(data => {
        setScenarios(data.scenarios)
        setSelectedScenario(data.scenarios[0])
      })
      .catch(err => console.error('Error loading scenarios:', err))
  }, [])

  const runDemo = () => {
    setIsAnimating(true)
    setCurrentLayer(0)
    setUserDecision(null)
    setShowExplainability(false)

    let layer = 0
    const interval = setInterval(() => {
      layer++
      if (layer >= LAYERS.length) {
        clearInterval(interval)
        setIsAnimating(false)
        setShowExplainability(true)
      } else {
        setCurrentLayer(layer)
      }
    }, 1200)
  }

  const resetDemo = () => {
    setCurrentLayer(-1)
    setUserDecision(null)
    setShowExplainability(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />
      case 'block':
        return <XCircleIcon className="w-6 h-6 text-red-500" />
      case 'warning':
      case 'require_approval':
      case 'require':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
      case 'skip':
        return <CheckCircleIcon className="w-6 h-6 text-gray-400" />
      default:
        return <ClockIcon className="w-6 h-6 text-gray-400" />
    }
  }

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    }
    return colors[severity] || 'bg-gray-500'
  }

  if (!selectedScenario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const explainabilityData = selectedScenario.layers.rtd.features
    ? Object.entries(selectedScenario.layers.rtd.features).map(([key, value]) => ({
        feature: key.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        score: Math.round((value as number) * 100),
        value: value
      }))
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Interactive Product Tour
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Watch SELA&apos;s 6-layer defense architecture in action
          </p>
        </motion.div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Select Attack Scenario:
              </label>
              <select
                value={selectedScenario.id}
                onChange={(e) => {
                  const scenario = scenarios.find((s: any) => s.id === e.target.value)
                  setSelectedScenario(scenario)
                  resetDemo()
                }}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                disabled={isAnimating}
              >
                {scenarios.map((scenario: any) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={runDemo}
                disabled={isAnimating}
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold rounded-lg shadow-lg transition-all disabled:cursor-not-allowed"
              >
                {isAnimating ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Run Flow
                  </>
                )}
              </button>

              {currentLayer >= 0 && (
                <button
                  onClick={resetDemo}
                  className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  {selectedScenario.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Severity:</span>
                    <span className={`px-2 py-1 ${getSeverityColor(selectedScenario.severity)} text-white text-xs font-bold rounded uppercase`}>
                      {selectedScenario.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Risk Score:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedScenario.riskScore}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {LAYERS.map((layer, index) => {
            const layerData = selectedScenario.layers[layer.id]
            const isActive = currentLayer === index
            const isCompleted = currentLayer > index
            const isPending = currentLayer < index

            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isPending ? 0.4 : 1, 
                  x: 0,
                  scale: isActive ? 1.02 : 1
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`card ${isActive ? 'ring-2 ring-primary-500 shadow-xl' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center relative"
                    style={{ backgroundColor: `${layer.color}20` }}
                  >
                    <layer.icon 
                      className="w-8 h-8" 
                      style={{ color: layer.color }}
                    />
                    <div 
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.number}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {layer.name}
                      </h3>
                      {isCompleted && layerData && (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(layerData.status)}
                          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                            Score: {layerData.score}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                      {layer.description}
                    </p>

                    <AnimatePresence>
                      {(isActive || isCompleted) && layerData && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {layerData.details}
                            </p>
                          </div>

                          {isActive && (
                            <div className="flex items-center gap-2 text-sm text-primary-500">
                              <ArrowPathIcon className="w-4 h-4 animate-spin" />
                              <span>Processing layer...</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {!isAnimating && currentLayer >= LAYERS.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Final Decision
              </h3>

              <div className="flex items-center gap-4 mb-6">
                {selectedScenario.finalDecision === 'blocked' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg flex-1">
                    <XCircleIcon className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="font-bold text-red-900 dark:text-red-100">REQUEST BLOCKED</div>
                      <div className="text-sm text-red-700 dark:text-red-300">Security policy violation detected</div>
                    </div>
                  </div>
                )}

                {selectedScenario.finalDecision === 'allowed' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg flex-1">
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-bold text-green-900 dark:text-green-100">REQUEST ALLOWED</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Proceeding safely</div>
                    </div>
                  </div>
                )}

                <div className="text-right">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Execution Time</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedScenario.executionTime}ms
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showExplainability && explainabilityData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mt-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                ML Feature Attribution
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Contribution of each feature to the threat detection score
              </p>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={explainabilityData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="feature" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                    {explainabilityData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 0.7 ? '#ef4444' : entry.value > 0.5 ? '#f59e0b' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
