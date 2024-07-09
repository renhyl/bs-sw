import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/characters', { waitUntil: 'networkidle' }) // waitUntil: 'networkidle' for WS to iniutialize
})

test('has correct heading', async ({ page }) => {
    // Expects page to have a heading
    await expect(page.getByRole('heading', { name: 'Star Wars Characters:' })).toBeVisible()
})

test.describe('Page shows Star Wars Characters', () => {
    test.describe('specific characters names are visible', () => {
        test('Luke Skywalker', async ({ page }) => {
            await expect(page.getByText('Luke Skywalker')).toBeVisible()
        })

        test('Leia Organa', async ({ page }) => {
            await expect(page.getByText('Leia Organa')).toBeVisible()
        })
    })

    test('page lists 5 characters per page', async ({ page }) => {
        await expect(page.locator('.characters-list li')).toHaveCount(5)
    })
})

test.describe('Character Pagination', () => {
    test('clicking next button displays different characters', async ({ page }) => {
        page.getByLabel('Go to next page').click()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Owen Lars')).toBeVisible()
    })

    test('clicking `Go to next page` button displays different characters', async ({ page }) => {
        page.getByLabel('Go to next page').click()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Owen Lars')).toBeVisible()
    })

    test('clicking `Go to previous page` button navigates to previews page', async ({ page }) => {
        page.getByLabel('Go to next page').click()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Owen Lars')).toBeVisible()

        page.getByLabel('Go to previous page').click()

        await expect(page.getByText('Luke Skywalker')).toBeVisible()
        await expect(page.getByText('Owen Lars')).not.toBeVisible()
    })

    test('clicking on pagination page number `2` displays different characters', async ({
        page
    }) => {
        page.getByRole('link', { name: '2' }).click()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Owen Lars')).toBeVisible()
    })

    test('clicking on pagination page number `3` displays different characters', async ({
        page
    }) => {
        page.getByRole('link', { name: '3' }).click()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Chewbacca')).toBeVisible()
    })

    test('clicking `Go to previous page` when on page 1 of pagination is not allowed and has no effect', async ({
        page
    }) => {
        await expect(page.getByLabel('Go to previous page')).toBeDisabled()
        await expect(page.getByText('Luke Skywalker')).toBeVisible()
    })

    test('clicking `Go to last page` button makes button disabled', async ({ page }) => {
        page.getByLabel('Go to last page').click()
        await expect(page.getByLabel('Go to last page')).toBeDisabled()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Sly Moore')).toBeVisible()
    })

    test('clicking `Go to first page` from last pagemakes button disabled', async ({ page }) => {
        page.getByLabel('Go to last page').click()
        await expect(page.getByLabel('Go to last page')).toBeDisabled()
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Sly Moore')).toBeVisible()

        page.getByLabel('Go to first page').click()

        await expect(page.getByLabel('Go to first page')).toBeDisabled()
        await expect(page.getByLabel('Go to last page')).toBeEnabled()
        await expect(page.getByText('Luke Skywalker')).toBeVisible()
        await expect(page.getByText('Sly Moore')).not.toBeVisible()
    })

    test('clicking `Go to next page` 4 times takes user to 5th pagination page', async ({
        page
    }) => {
        for (let index = 0; index < 4; index++) {
            await page.getByLabel('Go to next page').click()
        }
        await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
        await expect(page.getByText('Boba Fett')).toBeVisible()
        await expect(page.getByRole('link', { name: '5' })).toHaveClass(/active/)
    })

    test.describe('While on 5th pagination page', () => {
        test('clicking `Go to previous page` 4 times takes user to 1st pagination page', async ({
            page
        }) => {
            /**
             * go forward to 5th page
             */
            for (let index = 0; index < 4; index++) {
                await page.getByLabel('Go to next page').click()
            }
            await expect(page.getByText('Luke Skywalker')).not.toBeVisible()
            await expect(page.getByText('Boba Fett')).toBeVisible()
            await expect(page.getByRole('link', { name: '5' })).toHaveClass(/active/)

            /**
             * go backwards to 1st page
             */
            for (let index = 0; index < 4; index++) {
                await page.getByLabel('Go to previous page').click()
            }
            await expect(page.getByText('Luke Skywalker')).toBeVisible()
            await expect(page.getByText('Boba Fett')).not.toBeVisible()
            await expect(page.getByRole('link', { name: '1' })).toHaveClass(/active/)
        })
    })
})
