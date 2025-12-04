'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
    useEffect(() => {
        const isMobile = window.innerWidth < 768

        const lenis = new Lenis({
            duration: isMobile ? 0.8 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: !isMobile,
            wheelMultiplier: isMobile ? 1.5 : 1,
            touchMultiplier: isMobile ? 3 : 2,
            infinite: false,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return null
}
