'use client'

import { useEffect, useRef } from 'react'

export default function CyberArchitectureBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)

        // Circuit nodes
        class CircuitNode {
            x: number
            y: number
            connections: CircuitNode[]
            pulsePhase: number
            glowIntensity: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.connections = []
                this.pulsePhase = Math.random() * Math.PI * 2
                this.glowIntensity = 0
            }

            draw(ctx: CanvasRenderingContext2D, time: number) {
                // Node glow
                const pulse = Math.sin(time * 0.001 + this.pulsePhase) * 0.5 + 0.5
                const glowRadius = 3 + pulse * 2

                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius)
                gradient.addColorStop(0, `rgba(6, 182, 212, ${0.8 + pulse * 0.2})`)
                gradient.addColorStop(0.5, `rgba(16, 185, 129, ${0.4 + pulse * 0.1})`)
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)
                ctx.fill()

                // Core node
                ctx.fillStyle = `rgba(6, 182, 212, ${0.9 + pulse * 0.1})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Energy pulse
        class EnergyPulse {
            fromNode: CircuitNode
            toNode: CircuitNode
            progress: number
            speed: number
            active: boolean

            constructor(fromNode: CircuitNode, toNode: CircuitNode) {
                this.fromNode = fromNode
                this.toNode = toNode
                this.progress = 0
                this.speed = 0.002 + Math.random() * 0.003
                this.active = true
            }

            update() {
                this.progress += this.speed
                if (this.progress >= 1) {
                    this.active = false
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                if (!this.active) return

                const x = this.fromNode.x + (this.toNode.x - this.fromNode.x) * this.progress
                const y = this.fromNode.y + (this.toNode.y - this.fromNode.y) * this.progress

                // Energy pulse glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0.9)')
                gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.5)')
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(x, y, 8, 0, Math.PI * 2)
                ctx.fill()

                // Core pulse
                ctx.fillStyle = 'rgba(16, 185, 129, 1)'
                ctx.beginPath()
                ctx.arc(x, y, 2, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Create circuit grid
        const nodes: CircuitNode[] = []
        const gridSpacing = 120
        const rows = Math.ceil(canvas.height / gridSpacing) + 2
        const cols = Math.ceil(canvas.width / gridSpacing) + 2

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSpacing + (Math.random() - 0.5) * 40
                const y = row * gridSpacing + (Math.random() - 0.5) * 40
                nodes.push(new CircuitNode(x, y))
            }
        }

        // Connect nodes
        nodes.forEach((node, index) => {
            nodes.forEach((otherNode, otherIndex) => {
                if (index !== otherIndex) {
                    const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
                    if (distance < gridSpacing * 1.5 && Math.random() > 0.7) {
                        node.connections.push(otherNode)
                    }
                }
            })
        })

        const pulses: EnergyPulse[] = []
        let lastPulseTime = 0

        // Animation loop
        const animate = (time: number) => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw connections
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)'
            ctx.lineWidth = 1
            nodes.forEach(node => {
                node.connections.forEach(connectedNode => {
                    ctx.beginPath()
                    ctx.moveTo(node.x, node.y)
                    ctx.lineTo(connectedNode.x, connectedNode.y)
                    ctx.stroke()
                })
            })

            // Draw nodes
            nodes.forEach(node => node.draw(ctx, time))

            // Create new pulses
            if (time - lastPulseTime > 800 && pulses.length < 15) {
                const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
                if (randomNode.connections.length > 0) {
                    const targetNode = randomNode.connections[Math.floor(Math.random() * randomNode.connections.length)]
                    pulses.push(new EnergyPulse(randomNode, targetNode))
                    lastPulseTime = time
                }
            }

            // Update and draw pulses
            pulses.forEach((pulse, index) => {
                pulse.update()
                pulse.draw(ctx)
                if (!pulse.active) {
                    pulses.splice(index, 1)
                }
            })

            requestAnimationFrame(animate)
        }

        animate(0)

        return () => {
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0f, #000000)' }}
        />
    )
}
