'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  onError?: () => void
}

interface State {
  hasError: boolean
}

export default class GameErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('SELA Game Error:', error)
    this.props.onError?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[10000]">
          <div className="max-w-md p-8 bg-slate-900 rounded-2xl border-2 border-red-500/50 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Demo Issue</h2>
            <p className="text-slate-300 mb-6">
              The SELA demo had a technical issue. The core product is fine.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-colors"
            >
              Return to Site
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
