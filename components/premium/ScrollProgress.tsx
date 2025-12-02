'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            setProgress(scrollPercent)
        }

        window.addEventListener('scroll', updateProgress, { passive: true })
        updateProgress()

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-200 dark:bg-slate-800">
            <div
                className="h-full bg-gradient-to-r from-primary-500 via-accent-blue to-accent-teal transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
