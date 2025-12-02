'use client'

import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
    decimals?: number
    className?: string
}

export default function AnimatedCounter({
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    decimals = 0,
    className = '',
}: AnimatedCounterProps) {
    const countRef = useRef<HTMLSpanElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!countRef.current || hasAnimated.current) return

        const element = countRef.current
        const startTime = Date.now()
        const startValue = 0

        const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - progress, 4)
            const current = startValue + (end - startValue) * easeOut

            element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                hasAnimated.current = true
            }
        }

        // Use IntersectionObserver to trigger animation when visible
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    animate()
                }
            },
            { threshold: 0.5 }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [end, duration, suffix, prefix, decimals])

    return <span ref={countRef} className={className}>{`${prefix}${end}${suffix}`}</span>
}
