import { expect, Locator, Page } from '@playwright/test'

export class RequestsPage {
  readonly page: Page
  readonly newRequestButton: Locator
  readonly requestCards: Locator
  readonly filterTabs: Locator
  readonly realTimeStatus: Locator

  constructor(page: Page) {
    this.page = page
    this.newRequestButton = page
      .locator('[data-testid="new-request-button"]')
      .first()
    this.requestCards = page.locator('[data-testid="request-card"]')
    this.filterTabs = page.locator('[data-testid="request-filters"]')
    this.realTimeStatus = page.locator('[data-testid="real-time-status"]')
  }

  async goto() {
    await this.page.goto('/requests')
    await this.page.waitForLoadState('networkidle')
  }

  async createNewRequest(requestData: {
    title: string
    description: string
    businessArea: string
    service: string
  }) {
    // Click new request button
    await this.newRequestButton.click()

    // Fill out the form
    await this.page.fill('[data-testid="request-title"]', requestData.title)
    await this.page.fill(
      '[data-testid="request-description"]',
      requestData.description
    )

    // Select business area
    await this.page.click('[data-testid="business-area-selector"]')
    await this.page.click(
      `[data-testid="business-area-${requestData.businessArea}"]`
    )

    // Select service
    await this.page.click('[data-testid="service-selector"]')
    await this.page.click(`[data-testid="service-${requestData.service}"]`)

    // Submit the form
    await this.page.click('[data-testid="submit-request"]')

    // Wait for the request to be created
    await this.page.waitForLoadState('networkidle')
  }

  async filterByStatus(status: string) {
    await this.page.click(`[data-testid="filter-${status.toLowerCase()}"]`)
    await this.page.waitForLoadState('networkidle')
  }

  async getRequestCount(): Promise<number> {
    return await this.requestCards.count()
  }

  async clickRequestCard(title: string) {
    await this.page.click(`[data-testid="request-card"]:has-text("${title}")`)
    await this.page.waitForLoadState('networkidle')
  }

  async waitForRealTimeUpdate() {
    // Wait for real-time status to show "Connected"
    await expect(this.realTimeStatus).toContainText('Connected')
  }
}

export class RequestDetailsPage {
  readonly page: Page
  readonly requestTitle: Locator
  readonly requestDescription: Locator
  readonly statusBadge: Locator
  readonly progressBar: Locator
  readonly assignedTo: Locator

  constructor(page: Page) {
    this.page = page
    this.requestTitle = page.locator('[data-testid="request-title"]')
    this.requestDescription = page.locator(
      '[data-testid="request-description"]'
    )
    this.statusBadge = page.locator('[data-testid="status-badge"]')
    this.progressBar = page.locator('[data-testid="progress-bar"]')
    this.assignedTo = page.locator('[data-testid="assigned-to"]')
  }

  async waitForLoad() {
    await this.requestTitle.waitFor()
    await this.page.waitForLoadState('networkidle')
  }

  async getRequestDetails() {
    return {
      title: await this.requestTitle.textContent(),
      description: await this.requestDescription.textContent(),
      status: await this.statusBadge.textContent(),
    }
  }
}

export class AdminDashboard {
  readonly page: Page
  readonly userTable: Locator
  readonly impersonateButtons: Locator
  readonly organizationFilter: Locator

  constructor(page: Page) {
    this.page = page
    this.userTable = page.locator('[data-testid="users-table"]')
    this.impersonateButtons = page.locator('[data-testid^="impersonate-"]')
    this.organizationFilter = page.locator(
      '[data-testid="organization-filter"]'
    )
  }

  async goto() {
    await this.page.goto('/admin')
    await this.page.waitForLoadState('networkidle')
  }

  async filterByOrganization(organizationName: string) {
    await this.organizationFilter.click()
    await this.page.click(`text="${organizationName}"`)
    await this.page.waitForLoadState('networkidle')
  }

  async impersonateUser(userEmail: string) {
    await this.page.click(`[data-testid="impersonate-${userEmail}"]`)
    await this.page.waitForLoadState('networkidle')
  }

  async getUserCount(): Promise<number> {
    return await this.page.locator('[data-testid="user-row"]').count()
  }
}

export class NewRequestDialog {
  readonly page: Page
  readonly dialog: Locator
  readonly titleInput: Locator
  readonly descriptionInput: Locator
  readonly businessAreaSelector: Locator
  readonly serviceSelector: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.dialog = page.locator('[data-testid="new-request-dialog"]')
    this.titleInput = page.locator('[data-testid="request-title"]')
    this.descriptionInput = page.locator('[data-testid="request-description"]')
    this.businessAreaSelector = page.locator(
      '[data-testid="business-area-selector"]'
    )
    this.serviceSelector = page.locator('[data-testid="service-selector"]')
    this.submitButton = page.locator('[data-testid="submit-request"]')
  }

  async waitForOpen() {
    await this.dialog.waitFor()
  }

  async fillForm(data: {
    title: string
    description: string
    businessArea: string
    service: string
  }) {
    await this.titleInput.fill(data.title)
    await this.descriptionInput.fill(data.description)

    await this.businessAreaSelector.click()
    await this.page.click(`[data-testid="business-area-${data.businessArea}"]`)

    await this.serviceSelector.click()
    await this.page.click(`[data-testid="service-${data.service}"]`)
  }

  async submit() {
    await this.submitButton.click()
    await this.dialog.waitFor({ state: 'hidden' })
  }
}
