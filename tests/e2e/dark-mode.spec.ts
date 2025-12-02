import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
    test('should toggle dark mode', async ({ page }) => {
        await page.goto('http://localhost:3001')

        // Find theme toggle button
        const themeToggle = page.locator('button').filter({ hasText: /theme|dark|light/i }).or(
            page.locator('[aria-label*="theme"]')
        )

        // Get initial class
        const html = page.locator('html')
        const initialClass = await html.getAttribute('class')

        // Click toggle
        await themeToggle.first().click()
        await page.waitForTimeout(300)

        // Check class changed
        const newClass = await html.getAttribute('class')
        expect(newClass).not.toBe(initialClass)
    })

    test('should persist dark mode preference', async ({ page, context }) => {
        await page.goto('http://localhost:3001')

        // Toggle dark mode
        const themeToggle = page.locator('button').filter({ hasText: /theme|dark|light/i }).or(
            page.locator('[aria-label*="theme"]')
        )
        await themeToggle.first().click()
        await page.waitForTimeout(300)

        const html = page.locator('html')
        const darkModeClass = await html.getAttribute('class')

        // Reload page
        await page.reload()
        await page.waitForTimeout(500)

        // Check persistence
        const reloadedClass = await html.getAttribute('class')
        expect(reloadedClass).toBe(darkModeClass)
    })
})
