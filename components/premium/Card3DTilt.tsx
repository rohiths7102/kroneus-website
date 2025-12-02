'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface Card3DTiltProps {
    children: ReactNode
    className?: string
    maxTilt?: number
}

export default function Card3DTilt({
    children,
    className = '',
    maxTilt = 15,
}: Card3DTiltProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const card = cardRef.current
        if (!card) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = ((y - centerY) / centerY) * -maxTilt
            const rotateY = ((x - centerX) / centerX) * maxTilt

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        }

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }

        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            card.removeEventListener('mousemove', handleMouseMove)
            card.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [maxTilt])

    return (
        <div
            ref={cardRef}
            className={`gpu-accelerated transition-transform duration-200 ease-out ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    )
}
