import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlassmorphicCard from '@/components/premium/GlassmorphicCard'

describe('GlassmorphicCard', () => {
    it('renders children correctly', () => {
        const { getByText } = render(
            <GlassmorphicCard>
                <div>Test Content</div>
            </GlassmorphicCard>
        )
        expect(getByText('Test Content')).toBeInTheDocument()
    })

    it('applies glass class by default', () => {
        const { container } = render(
            <GlassmorphicCard>Content</GlassmorphicCard>
        )
        const card = container.firstChild
        expect(card).toHaveClass('glass')
    })

    it('applies glass-dark class when isDark is true', () => {
        const { container } = render(
            <GlassmorphicCard isDark>Content</GlassmorphicCard>
        )
        const card = container.firstChild
        expect(card).toHaveClass('glass-dark')
    })

    it('applies hover classes when hover is true', () => {
        const { container } = render(
            <GlassmorphicCard hover>Content</GlassmorphicCard>
        )
        const card = container.firstChild
        expect(card).toHaveClass('hover:shadow-glow-lg')
        expect(card).toHaveClass('hover:-translate-y-1')
    })

    it('applies custom className', () => {
        const { container } = render(
            <GlassmorphicCard className="custom-class">Content</GlassmorphicCard>
        )
        const card = container.firstChild
        expect(card).toHaveClass('custom-class')
    })
})
