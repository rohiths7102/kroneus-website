'use client'

import { useEffect, useRef } from 'react'

interface UnifiedCyberBackgroundProps {
    variant?: 'hero' | 'section'
    intensity?: 'low' | 'medium' | 'high'
}

export default function UnifiedCyberBackground({
    variant = 'hero',
    intensity = 'low'
}: UnifiedCyberBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        // Set canvas size
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)

        // Intensity settings - MUCH DARKER
        const intensityConfig = {
            low: {
                lineOpacity: 0.02, // Was 0.08, now 75% darker
                nodeOpacity: 0.15, // Was 0.8, now ~80% darker  
                pulseOpacity: 0.3, // Was 0.9, now ~67% darker
                pulseCount: 8,
                fadeRate: 0.08, // Faster fade for subtlety
            },
            medium: {
                lineOpacity: 0.04,
                nodeOpacity: 0.25,
                pulseOpacity: 0.5,
                pulseCount: 12,
                fadeRate: 0.06,
            },
            high: {
                lineOpacity: 0.06,
                nodeOpacity: 0.4,
                pulseOpacity: 0.7,
                pulseCount: 15,
                fadeRate: 0.05,
            },
        }

        const config = intensityConfig[intensity]

        // Circuit nodes
        class CircuitNode {
            x: number
            y: number
            connections: CircuitNode[]
            pulsePhase: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.connections = []
                this.pulsePhase = Math.random() * Math.PI * 2
            }

            draw(ctx: CanvasRenderingContext2D, time: number) {
                const pulse = Math.sin(time * 0.0008 + this.pulsePhase) * 0.3 + 0.7 // Slower, subtler pulse
                const glowRadius = 2 + pulse * 1  // Smaller glow

                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius)
                gradient.addColorStop(0, `rgba(6, 182, 212, ${config.nodeOpacity * pulse})`)
                gradient.addColorStop(0.5, `rgba(16, 185, 129, ${config.nodeOpacity * 0.4 * pulse})`)
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)
                ctx.fill()

                // Core node - even subtler
                ctx.fillStyle = `rgba(6, 182, 212, ${config.nodeOpacity * 0.6})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
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
                this.speed = 0.001 + Math.random() * 0.002 // Slower
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

                // Energy pulse glow - much subtler
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6)
                gradient.addColorStop(0, `rgba(16, 185, 129, ${config.pulseOpacity})`)
                gradient.addColorStop(0.5, `rgba(6, 182, 212, ${config.pulseOpacity * 0.4})`)
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(x, y, 6, 0, Math.PI * 2)
                ctx.fill()

                // Core pulse
                ctx.fillStyle = `rgba(16, 185, 129, ${config.pulseOpacity * 0.8})`
                ctx.beginPath()
                ctx.arc(x, y, 1.5, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Create circuit grid - spacing based on variant
        const nodes: CircuitNode[] = []
        const gridSpacing = variant === 'section' ? 150 : 120 // Larger spacing for sections
        const rows = Math.ceil(canvas.height / gridSpacing) + 2
        const cols = Math.ceil(canvas.width / gridSpacing) + 2

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSpacing + (Math.random() - 0.5) * 50
                const y = row * gridSpacing + (Math.random() - 0.5) * 50
                nodes.push(new CircuitNode(x, y))
            }
        }

        // Connect nodes - fewer connections for sections
        const connectionProbability = variant === 'section' ? 0.75 : 0.7
        nodes.forEach((node, index) => {
            nodes.forEach((otherNode, otherIndex) => {
                if (index !== otherIndex) {
                    const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
                    if (distance < gridSpacing * 1.5 && Math.random() > connectionProbability) {
                        node.connections.push(otherNode)
                    }
                }
            })
        })

        const pulses: EnergyPulse[] = []
        let lastPulseTime = 0

        // Animation loop
        const animate = (time: number) => {
            // Faster fade for darker trail
            ctx.fillStyle = `rgba(0, 0, 0, ${config.fadeRate})`
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw connections - MUCH DARKER
            ctx.strokeStyle = `rgba(6, 182, 212, ${config.lineOpacity})`
            ctx.lineWidth = 0.8
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

            // Create new pulses - less frequent
            if (time - lastPulseTime > 1200 && pulses.length < config.pulseCount) {
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
    }, [variant, intensity])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
                background: variant === 'hero'
                    ? 'linear-gradient(to bottom, #000000, #05050a, #000000)'
                    : 'linear-gradient(to bottom, #000000, #0a0a0f, #050508)',
            }}
        />
    )
}
