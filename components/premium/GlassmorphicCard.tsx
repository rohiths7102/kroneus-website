'use client'

import { ReactNode } from 'react'

interface GlassmorphicCardProps {
    children: ReactNode
    className?: string
    isDark?: boolean
    hover?: boolean
}

export default function GlassmorphicCard({
    children,
    className = '',
    isDark = false,
    hover = true,
}: GlassmorphicCardProps) {
    return (
        <div
            className={`
        ${isDark ? 'glass-dark' : 'glass'}
        rounded-xl p-6
        ${hover ? 'hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    )
}
