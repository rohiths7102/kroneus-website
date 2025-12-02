import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test('should load successfully', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Check main headline is visible
        await expect(page.getByRole('heading', { name: /SELA/i })).toBeVisible()

        // Check hero section loads
        await expect(page.locator('[data-section="hero"]')).toBeVisible()
    })

    test('should have scroll progress bar', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Scroll progress should be visible
        const progressBar = page.locator('.fixed.top-0.left-0.right-0.z-\\[100\\]')
        await expect(progressBar).toBeVisible()
    })

    test('should show chatbot button', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Chatbot button should be visible in bottom-right
        const chatButton = page.locator('button[aria-label="Open chat"]').or(page.locator('.fixed.bottom-6.right-6'))
        await expect(chatButton.first()).toBeVisible()
    })

    test('should navigate through sections on scroll', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Check all sections exist
        await expect(page.locator('[data-section="hero"]')).toBeVisible()
        await expect(page.locator('[data-section="value-props"]')).toBeVisible()
        await expect(page.locator('[data-section="stats"]')).toBeVisible()
        await expect(page.locator('[data-section="trust-signals"]')).toBeVisible()
        await expect(page.locator('[data-section="cta"]')).toBeVisible()
    })

    test('should display animated counters in hero', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Wait for counters to appear and animate
        await page.waitForTimeout(3000)

        // Check for stat values (they should be visible after animation)
        const statsContainer = page.locator('.glass-dark').first()
        await expect(statsContainer).toBeVisible()
    })

    test('should open chatbot on click', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Find and click chatbot button
        const chatButton = page.locator('.fixed.bottom-6.right-6').first()
        await chatButton.click()

        // Wait for chat window
        await page.waitForTimeout(500)

        // Check for chat window (should have input field)
        const chatWindow = page.locator('input[placeholder*="message"]').or(page.getByPlaceholder(/type/i))
        await expect(chatWindow.first()).toBeVisible({ timeout: 2000 })
    })
})
