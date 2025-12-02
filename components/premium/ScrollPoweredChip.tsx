'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollPoweredChipProps {
    videoSrc?: string // Path to your chip video
    logoPosition: { x: number; y: number }
    scrollTriggerStart?: number // Scroll position to start (default: 0)
    scrollTriggerEnd?: number // Scroll position to end (default: window height)
}

export default function ScrollPoweredChip({
    videoSrc,
    logoPosition,
    scrollTriggerStart = 0,
    scrollTriggerEnd = typeof window !== 'undefined' ? window.innerHeight : 800,
}: ScrollPoweredChipProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [energyStreams, setEnergyStreams] = useState<Array<{
        id: number
        angle: number
        length: number
        delay: number
    }>>([])

    // Generate energy streams
    useEffect(() => {
        const streams = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            angle: (i * 30) + Math.random() * 15, // Spread evenly in circle
            length: 150 + Math.random() * 200,
            delay: i * 0.08,
        }))
        setEnergyStreams(streams)
    }, [])

    // Scroll-controlled video playback
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const progress = Math.max(0, Math.min(1,
                (scrollY - scrollTriggerStart) / (scrollTriggerEnd - scrollTriggerStart)
            ))

            setScrollProgress(progress)

            // Control video frame based on scroll
            if (videoRef.current && videoRef.current.duration) {
                const video = videoRef.current
                const targetTime = progress * video.duration

                // Only update if significant difference to avoid jankiness
                if (Math.abs(video.currentTime - targetTime) > 0.1) {
                    video.currentTime = targetTime
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call

        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrollTriggerStart, scrollTriggerEnd])

    // Draw energy streams on canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (scrollProgress <= 0) {
                requestAnimationFrame(animate)
                return
            }

            // Draw electric streams flowing from logo
            energyStreams.forEach((stream) => {
                const streamProgress = Math.max(0, (scrollProgress - stream.delay) / (1 - stream.delay))
                if (streamProgress <= 0) return

                const startX = logoPosition.x
                const startY = logoPosition.y
                const angleRad = (stream.angle * Math.PI) / 180
                const currentLength = stream.length * streamProgress

                // Calculate end point
                const endX = startX + Math.cos(angleRad) * currentLength
                const endY = startY + Math.sin(angleRad) * currentLength

                // Draw glowing stream
                const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
                gradient.addColorStop(0, `rgba(6, 182, 212, ${0.6 * streamProgress})`)
                gradient.addColorStop(0.5, `rgba(16, 185, 129, ${0.4 * streamProgress})`)
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

                ctx.strokeStyle = gradient
                ctx.lineWidth = 2 + streamProgress * 1
                ctx.lineCap = 'round'

                // Main stream
                ctx.beginPath()
                ctx.moveTo(startX, startY)
                ctx.lineTo(endX, endY)
                ctx.stroke()

                // Glow effect
                ctx.strokeStyle = gradient
                ctx.lineWidth = 6 + streamProgress * 2
                ctx.globalAlpha = 0.3 * streamProgress
                ctx.beginPath()
                ctx.moveTo(startX, startY)
                ctx.lineTo(endX, endY)
                ctx.stroke()
                ctx.globalAlpha = 1

                // Endpoint particle
                const particleGradient = ctx.createRadialGradient(endX, endY, 0, endX, endY, 8)
                particleGradient.addColorStop(0, `rgba(16, 185, 129, ${0.8 * streamProgress})`)
                particleGradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.4 * streamProgress})`)
                particleGradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

                ctx.fillStyle = particleGradient
                ctx.beginPath()
                ctx.arc(endX, endY, 8, 0, Math.PI * 2)
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        animate()
    }, [scrollProgress, energyStreams, logoPosition])

    return (
        <>
            {/* Canvas for energy streams */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-40"
                style={{
                    opacity: scrollProgress > 0 ? Math.min(1, scrollProgress * 2) : 0,
                    transition: 'opacity 0.3s ease-out',
                }}
            />

            {/* Video element (hidden, controlled by scroll) */}
            {videoSrc && (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="fixed opacity-0 pointer-events-none"
                    muted
                    playsInline
                    preload="auto"
                    style={{ display: 'none' }}
                    onLoadedMetadata={(e) => {
                        // Pause immediately after load
                        e.currentTarget.pause()
                    }}
                />
            )}

            {/* Logo power glow effect */}
            <div
                className="fixed pointer-events-none z-40"
                style={{
                    left: logoPosition.x - 40,
                    top: logoPosition.y - 40,
                    width: 80,
                    height: 80,
                    opacity: scrollProgress,
                    transition: 'opacity 0.3s ease-out',
                }}
            >
                <div
                    className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-400/30 via-emerald-400/20 to-transparent blur-2xl"
                    style={{
                        transform: `scale(${1 + scrollProgress * 1.5})`,
                        transition: 'transform 0.3s ease-out',
                    }}
                />
                <div
                    className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-300/40 via-emerald-300/20 to-transparent blur-xl"
                    style={{
                        transform: `scale(${1 + scrollProgress * 1})`,
                        transition: 'transform 0.3s ease-out',
                    }}
                />
            </div>
        </>
    )
}
