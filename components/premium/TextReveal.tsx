'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export default function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        const chars = textRef.current.querySelectorAll('.char')

        gsap.fromTo(
            chars,
            {
                opacity: 0,
                y: 50,
                rotateX: -90,
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.03,
                delay: delay,
                ease: 'back.out(1.7)',
            }
        )
    }, [delay])

    const characters = text.split('').map((char, index) => (
        <span
            key={index}
            className="char inline-block"
            style={{ transformOrigin: '0 100%' }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ))

    return (
        <div ref={textRef} className={className}>
            {characters}
        </div>
    )
}
