import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AnimatedCounter from '@/components/premium/AnimatedCounter'

describe('AnimatedCounter', () => {
    it('renders the final value', () => {
        render(<AnimatedCounter end={100} />)
        expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('renders with prefix and suffix', () => {
        render(<AnimatedCounter end={50} prefix="<" suffix="ms" />)
        const element = screen.getByText(/<50ms/)
        expect(element).toBeInTheDocument()
    })

    it('renders decimals correctly', () => {
        render(<AnimatedCounter end={99.9} decimals={1} suffix="%" />)
        const element = screen.getByText(/99\.9%/)
        expect(element).toBeInTheDocument()
    })

    it('uses IntersectionObserver', () => {
        const mockObserve = vi.fn()
        const mockDisconnect = vi.fn()

        global.IntersectionObserver = vi.fn(() => ({
            observe: mockObserve,
            disconnect: mockDisconnect,
            unobserve: vi.fn(),
            root: null,
            rootMargin: '',
            thresholds: [],
            takeRecords: () => [],
        })) as any

        const { unmount } = render(<AnimatedCounter end={100} />)
        expect(mockObserve).toHaveBeenCalled()

        unmount()
        expect(mockDisconnect).toHaveBeenCalled()
    })
})
