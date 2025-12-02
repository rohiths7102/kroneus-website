'use client'

import { useEffect, useRef } from 'react'

interface City {
    name: string
    x: number
    y: number
    color: string
}

export default function AnimatedNetworkMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Your office cities
        const cities: City[] = [
            { name: 'London', x: 0.15, y: 0.28, color: '#00bcd4' }, // Cyan
            { name: 'Sydney', x: 0.73, y: 0.60, color: '#10b981' }, // Emerald
            { name: 'Bangalore', x: 0.55, y: 0.42, color: '#f59e0b' }, // Amber
            { name: 'Brighton', x: 0.16, y: 0.27, color: '#06b6d4' }, // Cyan
        ]

        const nodes = cities.map(city => ({
            ...city,
            x: city.x * canvas.width,
            y: city.y * canvas.height,
            pulse: Math.random() * Math.PI * 2,
        }))

        // Signal particles traveling between cities
        const signals: Array<{
            from: number
            to: number
            progress: number
            speed: number
            color: string
        }> = []

        // Spawn signals
        setInterval(() => {
            if (Math.random() > 0.6) {
                const from = Math.floor(Math.random() * nodes.length)
                const connections = [
                    [0, 1], [0, 2], [0, 3], // London to others
                    [1, 2], [2, 3], [1, 3]  // Cross connections
                ]
                const randomConnection = connections[Math.floor(Math.random() * connections.length)]
                signals.push({
                    from: randomConnection[0],
                    to: randomConnection[1],
                    progress: 0,
                    speed: 0.001 + Math.random() * 0.002,
                    color: nodes[randomConnection[0]].color,
                })
            }
        }, 600)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw connections (neon lines)
            const connections = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [1, 3]]
            connections.forEach(([from, to]) => {
                const nodeA = nodes[from]
                const nodeB = nodes[to]

                const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y)
                gradient.addColorStop(0, nodeA.color + '20')
                gradient.addColorStop(1, nodeB.color + '20')

                ctx.strokeStyle = gradient
                ctx.lineWidth = 2
                ctx.shadowBlur = 10
                ctx.shadowColor = nodeA.color
                ctx.beginPath()
                ctx.moveTo(nodeA.x, nodeA.y)
                ctx.lineTo(nodeB.x, nodeB.y)
                ctx.stroke()
                ctx.shadowBlur = 0
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

                // Neon glow signal
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
                gradient.addColorStop(0, signal.color + 'ff')
                gradient.addColorStop(0.5, signal.color + '88')
                gradient.addColorStop(1, signal.color + '00')

                ctx.fillStyle = gradient
                ctx.shadowBlur = 20
                ctx.shadowColor = signal.color
                ctx.beginPath()
                ctx.arc(x, y, 15, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0
            })

            // Draw nodes (pulsing city dots)
            nodes.forEach(node => {
                node.pulse += 0.04
                const pulseSize = 6 + Math.sin(node.pulse) * 2

                // Outer glow
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 3)
                gradient.addColorStop(0, node.color + 'aa')
                gradient.addColorStop(0.5, node.color + '44')
                gradient.addColorStop(1, node.color + '00')

                ctx.fillStyle = gradient
                ctx.shadowBlur = 25
                ctx.shadowColor = node.color
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2)
                ctx.fill()

                // Core dot
                ctx.fillStyle = node.color
                ctx.shadowBlur = 15
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0

                // City label
                ctx.fillStyle = '#ffffff'
                ctx.font = 'bold 14px Inter, sans-serif'
                ctx.textAlign = 'center'
                ctx.fillText(node.name, node.x, node.y - 20)
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
            className="fixed inset-0 -z-30 pointer-events-none"
            aria-hidden="true"
        />
    )
}
