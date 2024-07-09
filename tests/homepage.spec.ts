import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' }) // waitUntil: 'networkidle' for WS to iniutialize
})

test('has heading', async ({ page }) => {
    // Expects page to have a heading
    await expect(page.getByRole('heading', { name: 'BS Star Wars' })).toBeVisible()
})

test('navigate to characters page', async ({ page }) => {
    // Click the get started link.
    // await page.getByRole('link', { name: 'click to view star wars characters' }).click()
    await page.getByLabel('click to view start wars').click()

    // Expects page to have a heading
    await expect(page.getByRole('heading', { name: 'Star Wars Characters' })).toBeVisible()
})
