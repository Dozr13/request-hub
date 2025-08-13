import { expect, test } from '@playwright/test'
import { getUserByRole } from '../../fixtures/test-users'
import { AuthHelper } from '../../utils/auth-helpers'
import { RequestsPage } from '../../utils/page-objects'

test.describe('Authentication', () => {
  let authHelper: AuthHelper

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page)
  })

  test('should sign in successfully as regular user', async ({ page }) => {
    const testUser = getUserByRole('USER', 'org_30PvahD9FHCjj5IFVMnSysEsV30')

    // Sign in
    await authHelper.signIn(testUser)

    // Verify we're redirected to /home after authentication
    await expect(page).toHaveURL('/home')

    // Verify user menu is visible
    await expect(
      page.locator('[data-testid="user-menu"]').first()
    ).toBeVisible()

    // Navigate to requests page to verify functionality
    await page.goto('/requests')
    await expect(page).toHaveURL('/requests')

    // Verify we can see the requests page content
    const requestsPage = new RequestsPage(page)
    await expect(requestsPage.newRequestButton).toBeVisible()
  })

  test('should sign in successfully as admin user', async ({ page }) => {
    const adminUser = getUserByRole('ADMIN', 'org_30PvahD9FHCjj5IFVMnSysEsV30')

    // Sign in
    await authHelper.signIn(adminUser)

    // Verify we're redirected to /home after authentication
    await expect(page).toHaveURL('/home')

    // Navigate to requests page to verify admin functionality
    await page.goto('/requests')
    await expect(page).toHaveURL('/requests')

    // Verify admin can access admin navigation - wait longer for navigation to load
    await expect(page.getByRole('link', { name: 'Admin' }).first()).toBeVisible(
      { timeout: 10000 }
    )
  })

  test('should sign out successfully', async ({ page }) => {
    const testUser = getUserByRole('USER', 'org_30PvahD9FHCjj5IFVMnSysEsV30')

    // Sign in first
    await authHelper.signIn(testUser)

    // Verify we're signed in and on home page
    await expect(page).toHaveURL('/home')

    // Sign out
    await authHelper.signOut()

    // Verify we're redirected to root page
    await expect(page).toHaveURL('/')

    // Verify user menu is not visible
    await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible()
  })

  test('should redirect to sign-in when accessing protected route without auth', async ({
    page,
  }) => {
    // Try to access protected route without authentication
    await page.goto('/requests')

    // Should be redirected to sign-in
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test('should persist authentication across page reloads', async ({
    page,
  }) => {
    const testUser = getUserByRole('USER', 'org_30PvahD9FHCjj5IFVMnSysEsV30')

    // Sign in
    await authHelper.signIn(testUser)

    // Verify we're on home page
    await expect(page).toHaveURL('/home')

    // Reload the page
    await page.reload()

    // Should still be authenticated and on home page
    await expect(
      page.locator('[data-testid="user-menu"]').first()
    ).toBeVisible()
    await expect(page).toHaveURL('/home')
  })
})
