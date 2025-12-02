'use client'

import { ReactNode, CSSProperties } from 'react'

interface InfiniteMarqueeProps {
    children: ReactNode[]
    speed?: number
    direction?: 'left' | 'right'
    pauseOnHover?: boolean
    className?: string
}

export default function InfiniteMarquee({
    children,
    speed = 30,
    direction = 'left',
    pauseOnHover = true,
    className = '',
}: InfiniteMarqueeProps) {
    const animationStyle: CSSProperties = {
        animation: `scroll-${direction} ${speed}s linear infinite`,
    }

    return (
        <div className={`overflow-hidden ${className}`}>
            <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
            <div
                className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={animationStyle}
            >
                {/* Render children twice for seamless loop */}
                <div className="flex shrink-0 gap-8">{children}</div>
                <div className="flex shrink-0 gap-8">{children}</div>
            </div>
        </div>
    )
}
