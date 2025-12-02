'use client'

import { useEffect, useState } from 'react'

const sectionColors = [
    { id: 'hero', bgClass: 'bg-gradient-to-br from-black via-slate-950 to-black' },
    { id: 'company', bgClass: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-black' }, // Vibrant emerald
    { id: 'products', bgClass: 'bg-gradient-to-br from-blue-950 via-cyan-950 to-black' }, // Vibrant blue
    { id: 'demo', bgClass: 'bg-gradient-to-br from-purple-950 via-violet-950 to-black' }, // Vibrant purple
    { id: 'resources', bgClass: 'bg-gradient-to-br from-orange-950 via-amber-950 to-black' }, // Vibrant orange
    { id: 'about', bgClass: 'bg-gradient-to-br from-cyan-950 via-sky-950 to-black' }, // Vibrant cyan
    { id: 'contact', bgClass: 'bg-gradient-to-br from-pink-950 via-rose-950 to-black' }, // Vibrant pink
]

export default function SectionTransitions() {
    const [currentSection, setCurrentSection] = useState('hero')

    useEffect(() => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px',
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section')
                    if (sectionId) {
                        setCurrentSection(sectionId)
                    }
                }
            })
        }, observerOptions)

        // Observe all sections
        document.querySelectorAll('[data-section]').forEach((section) => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    const currentBg = sectionColors.find((s) => s.id === currentSection)?.bgClass || sectionColors[0].bgClass

    return (
        <div
            className={`fixed inset-0 -z-50 transition-all duration-1000 ease-in-out ${currentBg}`}
            style={{ willChange: 'background' }}
            aria-hidden="true"
        />
    )
}
