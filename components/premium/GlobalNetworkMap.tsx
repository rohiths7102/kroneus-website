'use client'

import { useEffect, useRef } from 'react'

export default function GlobalNetworkMap() {
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

        // Major global cities (20+ cities across the world)
        const cities = [
            // Americas
            { name: 'San Francisco', x: 0.10, y: 0.32, color: '#00bcd4' },
            { name: 'New York', x: 0.20, y: 0.30, color: '#00bcd4' },
            { name: 'Toronto', x: 0.18, y: 0.28, color: '#06b6d4' },
            { name: 'São Paulo', x: 0.25, y: 0.68, color: '#10b981' },
            { name: 'Mexico City', x: 0.13, y: 0.42, color: '#14b8a6' },

            // Europe
            { name: 'London', x: 0.47, y: 0.27, color: '#f59e0b' },
            { name: 'Brighton', x: 0.475, y: 0.275, color: '#f59e0b' },
            { name: 'Paris', x: 0.48, y: 0.29, color: '#f59e0b' },
            { name: 'Frankfurt', x: 0.50, y: 0.28, color: '#fb923c' },
            { name: 'Amsterdam', x: 0.49, y: 0.27, color: '#fbbf24' },
            { name: 'Stockholm', x: 0.52, y: 0.23, color: '#fcd34d' },

            // Middle East & Africa
            { name: 'Dubai', x: 0.58, y: 0.40, color: '#ec4899' },
            { name: 'Tel Aviv', x: 0.54, y: 0.38, color: '#f472b6' },
            { name: 'Cape Town', x: 0.52, y: 0.75, color: '#10b981' },

            // Asia Pacific
            { name: 'Mumbai', x: 0.64, y: 0.42, color: '#8b5cf6' },
            { name: 'Bangalore', x: 0.65, y: 0.45, color: '#8b5cf6' },
            { name: 'Singapore', x: 0.72, y: 0.52, color: '#a78bfa' },
            { name: 'Hong Kong', x: 0.75, y: 0.40, color: '#c084fc' },
            { name: 'Tokyo', x: 0.82, y: 0.34, color: '#e879f9' },
            { name: 'Seoul', x: 0.79, y: 0.32, color: '#f0abfc' },
            { name: 'Sydney', x: 0.88, y: 0.72, color: '#10b981' },
            { name: 'Melbourne', x: 0.87, y: 0.75, color: '#14b8a6' },
            { name: 'Auckland', x: 0.92, y: 0.76, color: '#06b6d4' },
        ]

        const nodes = cities.map(city => ({
            ...city,
            x: city.x * canvas.width,
            y: city.y * canvas.height,
            pulse: Math.random() * Math.PI * 2,
        }))

        // Generate connections between geographically close cities and hubs
        const connections: number[][] = []
        nodes.forEach((node, i) => {
            nodes.forEach((otherNode, j) => {
                if (i < j) {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
                    )
                    // Connect if distance is reasonable (creates regional clusters + some long connections)
                    if (distance < canvas.width * 0.3 || Math.random() > 0.85) {
                        connections.push([i, j])
                    }
                }
            })
        })

        // Signal particles
        const signals: Array<{
            from: number
            to: number
            progress: number
            speed: number
            color: string
        }> = []

        // Spawn signals more frequently
        setInterval(() => {
            if (connections.length > 0 && Math.random() > 0.5) {
                const randomConnection = connections[Math.floor(Math.random() * connections.length)]
                signals.push({
                    from: randomConnection[0],
                    to: randomConnection[1],
                    progress: 0,
                    speed: 0.0005 + Math.random() * 0.001,
                    color: nodes[randomConnection[0]].color,
                })
            }
        }, 400)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw connections (thin neon lines)
            connections.forEach(([from, to]) => {
                const nodeA = nodes[from]
                const nodeB = nodes[to]

                const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y)
                gradient.addColorStop(0, nodeA.color + '15')
                gradient.addColorStop(1, nodeB.color + '15')

                ctx.strokeStyle = gradient
                ctx.lineWidth = 1
                ctx.shadowBlur = 5
                ctx.shadowColor = nodeA.color
                ctx.beginPath()
                ctx.moveTo(nodeA.x, nodeA.y)
                ctx.lineTo(nodeB.x, nodeB.y)
                ctx.stroke()
                ctx.shadowBlur = 0
            })

            // Update and draw signals
            for (let i = signals.length - 1; i >= 0; i--) {
                const signal = signals[i]
                signal.progress += signal.speed

                if (signal.progress >= 1) {
                    signals.splice(i, 1)
                    continue
                }

                const from = nodes[signal.from]
                const to = nodes[signal.to]
                const x = from.x + (to.x - from.x) * signal.progress
                const y = from.y + (to.y - from.y) * signal.progress

                // Smaller neon glow signal
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10)
                gradient.addColorStop(0, signal.color + 'ff')
                gradient.addColorStop(0.5, signal.color + '88')
                gradient.addColorStop(1, signal.color + '00')

                ctx.fillStyle = gradient
                ctx.shadowBlur = 15
                ctx.shadowColor = signal.color
                ctx.beginPath()
                ctx.arc(x, y, 10, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0
            }

            // Draw nodes (small pulsing city dots)
            nodes.forEach(node => {
                node.pulse += 0.03
                const pulseSize = 4 + Math.sin(node.pulse) * 1.5

                // Outer glow
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2.5)
                gradient.addColorStop(0, node.color + 'aa')
                gradient.addColorStop(0.5, node.color + '44')
                gradient.addColorStop(1, node.color + '00')

                ctx.fillStyle = gradient
                ctx.shadowBlur = 20
                ctx.shadowColor = node.color
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize * 2.5, 0, Math.PI * 2)
                ctx.fill()

                // Core dot
                ctx.fillStyle = node.color
                ctx.shadowBlur = 12
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0
            })

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
            className="fixed inset-0 -z-30 pointer-events-none opacity-70"
            aria-hidden="true"
        />
    )
}
