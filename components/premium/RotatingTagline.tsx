'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const taglines = [
    'Innovate Freely. We Secure the Rest.',
    'Build Anything. We Secure Everything.',
    'Design Brilliance. We Defend Integrity.',
    'You Build Dreams. We Build Defenses.',
]

export default function RotatingTagline() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % taglines.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative h-32 flex items-center justify-center overflow-hidden">
            {taglines.map((tagline, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        y: index === currentIndex ? 0 : -50,
                        filter: index === currentIndex ? 'blur(0px)' : 'blur(10px)',
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4"
                        style={{
                            background: 'linear-gradient(135deg, #00bcd4 0%, #10b981 50%, #f59e0b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 60px rgba(0,188,212,0.4), 0 0 30px rgba(16,185,129,0.3)',
                            filter: 'drop-shadow(0 0 15px rgba(0,188,212,0.3))',
                        }}
                    >
                        {tagline}
                    </h2>
                </motion.div>
            ))}
        </div>
    )
}
