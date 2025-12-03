'use client'

import { useEffect, useRef } from 'react'

export default function PaloAltoBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string
            opacity: number
            canvas: HTMLCanvasElement

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 3 + 1
                this.speedX = (Math.random() - 0.5) * 0.5
                this.speedY = (Math.random() - 0.5) * 0.5

                const colors = ['#00bcd4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4']
                this.color = colors[Math.floor(Math.random() * colors.length)]
                this.opacity = Math.random() * 0.5 + 0.3
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > this.canvas.width) this.x = 0
                if (this.x < 0) this.x = this.canvas.width
                if (this.y > this.canvas.height) this.y = 0
                if (this.y < 0) this.y = this.canvas.height
            }

            draw() {
                if (!ctx) return

                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
                gradient.addColorStop(0, this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'))
                gradient.addColorStop(1, this.color + '00')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const particles: Particle[] = []
        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas))
        }

        const drawConnections = () => {
            if (!ctx) return

            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 188, 212, ${0.2 * (1 - distance / 150)})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.stroke()
                    }
                })
            })
        }

        let waveOffset = 0

        const drawWaves = () => {
            if (!ctx) return

            ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)'
            ctx.lineWidth = 2

            for (let i = 0; i < 3; i++) {
                ctx.beginPath()
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = Math.sin((x + waveOffset + i * 100) * 0.01) * 30 + canvas.height / 2 + i * 50
                    ctx.lineTo(x, y)
                }
                ctx.stroke()
            }

            waveOffset += 1
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            drawWaves()

            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })

            drawConnections()

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-20 pointer-events-none opacity-40"
            aria-hidden="true"
        />
    )
}
