'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ParallaxSectionProps {
    children: ReactNode
    speed?: number
    className?: string
}

export default function ParallaxSection({
    children,
    speed = 0.5,
    className = ''
}: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const handleScroll = () => {
            const rect = section.getBoundingClientRect()
            const scrolled = window.scrollY
            const rate = scrolled * speed
            section.style.transform = `translateY(${rate}px)`
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return (
        <div ref={sectionRef} className={`gpu-accelerated ${className}`}>
            {children}
        </div>
    )
}
