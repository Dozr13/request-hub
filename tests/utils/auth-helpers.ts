import { Page, expect } from '@playwright/test'
import { TestUser } from '../fixtures/test-users'

export class AuthHelper {
  constructor(private page: Page) {}

  /**
   * Sign in a user via Clerk's sign-in form
   */
  async signIn(user: TestUser) {
    // Use the correct base URL for navigation
    const baseUrl =
      process.env.E2E_BASE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000'
    await this.page.goto(`${baseUrl}/sign-in`)

    // Don't wait for networkidle - Clerk often has continuous network activity
    await this.page.waitForLoadState('load')

    // Wait for Clerk sign-in form to appear
    await this.page.waitForSelector(
      'input[name="identifier"], input[type="email"]',
      {
        timeout: 15000,
      }
    )

    // Log what we see on the sign-in page
    console.log('Sign-in page loaded successfully')
    const pageTitle = await this.page.title()
    console.log('Page title:', pageTitle)

    // Check if we see any Clerk-specific elements
    const clerkElements = await this.page
      .locator('[class*="clerk"], [data-clerk]')
      .count()
    console.log('Number of Clerk elements found:', clerkElements)

    // Fill in email
    const emailInput = this.page
      .locator('input[name="identifier"]')
      .or(this.page.locator('input[type="email"]'))
    await emailInput.fill(user.email)
    console.log(`Filled email: ${user.email}`)

    // Look for password field - it might appear after email
    await this.page.waitForSelector('input[name="password"]', {
      timeout: 10000,
    })

    // Fill in password
    await this.page.fill('input[name="password"]', user.password)
    console.log(`Filled password for user: ${user.email}`)

    // Wait a moment for form validation
    await this.page.waitForTimeout(1000)

    // Find and click the Continue button specifically (not Google or hidden buttons)
    const submitButton = this.page
      .locator('button[data-localization-key="formButtonPrimary"]')
      .or(
        this.page.locator(
          'button:has-text("Continue"):not([data-variant="outline"])'
        )
      )
      .or(this.page.locator('button[type="submit"]:not([aria-hidden="true"])'))

    await submitButton.first().click()
    console.log('Clicked submit button')

    // Wait for authentication to complete - users get redirected to /home after auth
    console.log('Waiting for redirect to /home after authentication...')
    try {
      await this.page.waitForURL(/\/home/, { timeout: 15000 })
      console.log('Successfully redirected to /home')
    } catch (error) {
      console.log('Did not redirect to /home, checking current URL...')
      const currentUrl = await this.page.url()
      console.log('Current URL after auth attempt:', currentUrl)

      // If we're still on sign-in page, authentication failed
      if (currentUrl.includes('/sign-in')) {
        console.log('Still on sign-in page, waiting a bit more...')
        await this.page.waitForTimeout(3000)

        const finalUrl = await this.page.url()
        if (finalUrl.includes('/sign-in')) {
          throw new Error('Authentication failed - still on sign-in page')
        }
      }
    }

    // Add debugging - check what's actually on the page
    console.log('Current URL:', await this.page.url())
    console.log('Page title:', await this.page.title())

    // Check if we're still on sign-in page (authentication failed)
    if (await this.page.url().includes('/sign-in')) {
      console.log('Still on sign-in page - authentication may have failed')

      // Check for error messages - make this optional to avoid timeouts
      try {
        const errorText = await this.page
          .locator(
            '[data-localization-key="formFieldError__email"], [data-localization-key="formFieldError__password"], .cl-formFieldError'
          )
          .textContent({ timeout: 5000 })
        if (errorText) {
          console.log('Authentication error:', errorText)
        }
      } catch (error) {
        console.log(
          'No error message found (this is normal if authentication is just slow)'
        )
      }

      // Take a screenshot for debugging
      await this.page.screenshot({ path: 'auth-failed.png' })
      throw new Error(
        `Authentication failed - still on sign-in page. Check screenshot for details.`
      )
    }

    // Check if we're on a blank page but authenticated (like you experienced)
    const bodyText = await this.page.textContent('body')
    if (!bodyText || bodyText.trim().length < 100) {
      console.log('Page appears to be blank, attempting to refresh...')
      await this.page.reload({ waitUntil: 'load' })
      await this.page.waitForTimeout(2000)
    }

    // Verify we're signed in by checking for user menu
    try {
      await expect(this.page.locator('[data-testid="user-menu"]')).toBeVisible({
        timeout: 15000,
      })
    } catch (error) {
      console.log('User menu not found. Taking screenshot for debugging...')
      await this.page.screenshot({ path: 'user-menu-not-found.png' })

      // Check what elements are actually on the page
      const bodyText = await this.page.textContent('body')
      console.log(
        'Page body text (first 500 chars):',
        bodyText?.substring(0, 500)
      )

      // Check for any authentication-related elements
      const authElements = await this.page
        .locator(
          '[data-testid], [class*="auth"], [class*="user"], [class*="menu"]'
        )
        .count()
      console.log('Number of potential auth elements found:', authElements)

      throw error
    }
  }

  /**
   * Sign out the current user
   */
  async signOut() {
    // Click user menu to open dropdown
    await this.page.click('[data-testid="user-menu"]')

    // Wait for menu to open and be visible
    await this.page.waitForSelector('button:has-text("Sign Out")', {
      timeout: 5000,
      state: 'visible',
    })

    // Click sign out button
    await this.page.click('button:has-text("Sign Out")')

    // Wait for redirect to root page
    await this.page.waitForURL('/', { timeout: 15000 })
  }

  /**
   * Switch organization (for multi-tenant testing)
   */
  async switchOrganization(organizationName: string) {
    // Click organization selector
    await this.page.click('[data-testid="organization-selector"]')

    // Click the target organization
    await this.page.click(`text="${organizationName}"`)

    // Wait for the switch to complete
    await this.page.waitForLoadState('networkidle')

    // Verify organization switched
    await expect(
      this.page.locator('[data-testid="current-organization"]')
    ).toContainText(organizationName)
  }

  /**
   * Check if user is currently signed in
   */
  async isSignedIn(): Promise<boolean> {
    try {
      await this.page.waitForSelector('[data-testid="user-menu"]', {
        timeout: 2000,
      })
      return true
    } catch {
      return false
    }
  }

  /**
   * Get current user info from the UI
   */
  async getCurrentUser() {
    await this.page.click('[data-testid="user-menu"]')

    const email = await this.page.textContent('[data-testid="user-email"]')
    const name = await this.page.textContent('[data-testid="user-name"]')

    // Close menu
    await this.page.keyboard.press('Escape')

    return { email, name }
  }

  /**
   * Impersonate another user (admin feature)
   */
  async impersonateUser(targetUserEmail: string) {
    // Navigate to admin dashboard
    await this.page.goto('/admin')

    // Find and click impersonate button for target user
    await this.page.click(`[data-testid="impersonate-${targetUserEmail}"]`)

    // Wait for impersonation to take effect
    await this.page.waitForLoadState('networkidle')

    // Verify impersonation banner is visible
    await expect(
      this.page.locator('[data-testid="impersonation-banner"]')
    ).toBeVisible()
  }

  /**
   * Stop impersonation
   */
  async stopImpersonation() {
    await this.page.click('[data-testid="stop-impersonation"]')

    // Wait for impersonation to end
    await this.page.waitForLoadState('networkidle')

    // Verify impersonation banner is gone
    await expect(
      this.page.locator('[data-testid="impersonation-banner"]')
    ).not.toBeVisible()
  }
}
