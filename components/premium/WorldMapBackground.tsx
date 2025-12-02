'use client'

import { useEffect, useRef } from 'react'

export default function WorldMapBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // City coordinates (major tech/finance hubs)
        const cities = [
            { x: 0.15, y: 0.35, name: 'New York' },
            { x: 0.12, y: 0.28, name: 'London' },
            { x: 0.50, y: 0.30, name: 'Moscow' },
            { x: 0.55, y: 0.40, name: 'Mumbai' },
            { x: 0.62, y: 0.25, name: 'Beijing' },
            { x: 0.67, y: 0.32, name: 'Tokyo' },
            { x: 0.73, y: 0.60, name: 'Sydney' },
            { x: 0.10, y: 0.45, name: 'São Paulo' },
            { x: 0.02, y: 0.30, name: 'San Francisco' },
            { x: 0.52, y: 0.35, name: 'Dubai' },
        ]

        // Convert relative to absolute coordinates
        const nodes = cities.map(city => ({
            x: city.x * canvas.width,
            y: city.y * canvas.height,
            pulse: Math.random() * Math.PI * 2,
            connections: [] as number[],
        }))

        // Create connections (network graph)
        nodes.forEach((node, i) => {
            // Connect to 2-3 nearest nodes
            const distances = nodes.map((other, j) => ({
                index: j,
                dist: Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2),
            }))
            distances.sort((a, b) => a.dist - b.dist)
            node.connections = distances.slice(1, 4).map(d => d.index)
        })

        // Signal particles traveling along connections
        const signals: Array<{
            from: number
            to: number
            progress: number
            speed: number
            color: string
        }> = []

        // Spawn signals periodically
        setInterval(() => {
            if (Math.random() > 0.7) {
                const from = Math.floor(Math.random() * nodes.length)
                const to = nodes[from].connections[Math.floor(Math.random() * nodes[from].connections.length)]
                signals.push({
                    from,
                    to,
                    progress: 0,
                    speed: 0.002 + Math.random() * 0.003,
                    color: Math.random() > 0.5 ? 'rgba(0, 188, 212, ' : 'rgba(16, 185, 129, ',
                })
            }
        }, 800)

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw connections (faint lines)
            ctx.strokeStyle = 'rgba(0, 188, 212, 0.08)'
            ctx.lineWidth = 1
            nodes.forEach((node, i) => {
                node.connections.forEach(targetIndex => {
                    const target = nodes[targetIndex]
                    ctx.beginPath()
                    ctx.moveTo(node.x, node.y)
                    ctx.lineTo(target.x, target.y)
                    ctx.stroke()
                })
            })

            // Update and draw signals
            signals.forEach((signal, index) => {
                signal.progress += signal.speed

                if (signal.progress >= 1) {
                    signals.splice(index, 1)
                    return
                }

                const from = nodes[signal.from]
                const to = nodes[signal.to]
                const x = from.x + (to.x - from.x) * signal.progress
                const y = from.y + (to.y - from.y) * signal.progress

                // Draw signal with glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
                gradient.addColorStop(0, signal.color + '0.8)')
                gradient.addColorStop(0.5, signal.color + '0.4)')
                gradient.addColorStop(1, signal.color + '0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(x, y, 8, 0, Math.PI * 2)
                ctx.fill()
            })

            // Draw nodes (pulsing dots)
            nodes.forEach(node => {
                node.pulse += 0.03
                const pulseSize = 3 + Math.sin(node.pulse) * 1

                // Glow effect
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2)
                gradient.addColorStop(0, 'rgba(0, 188, 212, 0.6)')
                gradient.addColorStop(0.5, 'rgba(0, 188, 212, 0.2)')
                gradient.addColorStop(1, 'rgba(0, 188, 212, 0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2)
                ctx.fill()

                // Core dot
                ctx.fillStyle = 'rgba(0, 188, 212, 0.9)'
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-45 pointer-events-none opacity-20 dark:opacity-30"
            aria-hidden="true"
        />
    )
}
