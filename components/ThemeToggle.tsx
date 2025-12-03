'use client'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [showMatrix, setShowMatrix] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    setShowMatrix(true)

    setTimeout(() => {
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, 800)

    setTimeout(() => {
      setShowMatrix(false)
    }, 3000)
  }

  return (
    <>
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border-2 border-cyan-500/40 hover:border-cyan-400/60 text-cyan-300 hover:text-cyan-200 transition-all group overflow-hidden"
        aria-label="Toggle theme"
      >
        <motion.div
          animate={{ rotate: theme === 'light' ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {theme === 'light' ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </motion.div>

        <SparklesIcon className="absolute top-0 right-0 h-3 w-3 text-yellow-300 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
      </motion.button>

      <AnimatePresence>
        {showMatrix && <MatrixEffect />}
      </AnimatePresence>
    </>
  )
}

function MatrixEffect() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-effect') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100)

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let animationId: number

    function draw() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      ctx!.fillStyle = '#0f0'
      ctx!.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx!.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      <canvas
        id="matrix-effect"
        className="w-full h-full"
      />
    </motion.div>
  )
}
