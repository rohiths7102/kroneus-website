'use client'

import { ReactNode, useRef, useEffect } from 'react'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    strength?: number
    onClick?: () => void
    href?: string
}

export default function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    onClick,
    href,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

    useEffect(() => {
        const button = buttonRef.current
        if (!button) return

        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as unknown as React.MouseEvent
            const rect = button.getBoundingClientRect()
            const x = mouseEvent.clientX - rect.left - rect.width / 2
            const y = mouseEvent.clientY - rect.top - rect.height / 2

            button.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        }

        const handleMouseLeave = () => {
            button.style.transform = 'translate(0, 0)'
        }

        button.addEventListener('mousemove', handleMouseMove)
        button.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            button.removeEventListener('mousemove', handleMouseMove)
            button.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength])

    const baseClassName = `btn-magnetic ${className}`

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={baseClassName}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            className={baseClassName}
        >
            {children}
        </button>
    )
}
