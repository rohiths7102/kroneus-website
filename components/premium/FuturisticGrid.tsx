'use client'

import { useEffect, useRef } from 'react'

export default function FuturisticGrid() {
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

        // Grid parameters
        const gridSize = 50
        const perspective = 600
        let offsetY = 0

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Animate grid moving towards viewer
            offsetY = (offsetY + 0.5) % gridSize

            // Draw perspective grid
            ctx.strokeStyle = 'rgba(0, 188, 212, 0.2)' // Cyan neon
            ctx.lineWidth = 1

            // Horizontal lines with perspective
            for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
                const adjustedY = y + offsetY

                // Calculate perspective
                const depth = (adjustedY - canvas.height / 2) / perspective
                const scale = Math.max(0.1, 1 - Math.abs(depth))

                ctx.beginPath()
                const leftX = canvas.width / 2 - (canvas.width / 2) * scale
                const rightX = canvas.width / 2 + (canvas.width / 2) * scale

                ctx.moveTo(leftX, adjustedY)
                ctx.lineTo(rightX, adjustedY)

                // Brighter lines closer to viewer
                ctx.strokeStyle = `rgba(0, 188, 212, ${0.1 + scale * 0.2})`
                ctx.shadowBlur = scale * 10
                ctx.shadowColor = '#00bcd4'
                ctx.stroke()
                ctx.shadowBlur = 0
            }

            // Vertical lines with perspective
            const numVerticalLines = 20
            for (let i = 0; i <= numVerticalLines; i++) {
                const x = (canvas.width / numVerticalLines) * i

                ctx.beginPath()
                ctx.moveTo(x, canvas.height)

                // Draw towards vanishing point (center top)
                const vanishX = canvas.width / 2
                const vanishY = canvas.height / 2 - perspective

                ctx.lineTo(
                    vanishX + (x - vanishX) * 0.3,
                    vanishY
                )

                ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)' // Emerald neon
                ctx.shadowBlur = 5
                ctx.shadowColor = '#10b981'
                ctx.stroke()
                ctx.shadowBlur = 0
            }

            // Add some glowing dots at intersections
            for (let y = 0; y < canvas.height; y += gridSize * 2) {
                for (let x = 0; x < canvas.width; x += gridSize * 2) {
                    if (Math.random() > 0.95) {
                        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
                        gradient.addColorStop(0, 'rgba(0, 188, 212, 0.8)')
                        gradient.addColorStop(1, 'rgba(0, 188, 212, 0)')

                        ctx.fillStyle = gradient
                        ctx.beginPath()
                        ctx.arc(x, y, 8, 0, Math.PI * 2)
                        ctx.fill()
                    }
                }
            }

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
            className="fixed inset-0 -z-40 pointer-events-none opacity-30"
            aria-hidden="true"
        />
    )
}
