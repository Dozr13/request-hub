import { UserRole } from '@/types'

export interface TestUser {
  email: string
  password: string
  name: string
  role: UserRole
  organization?: string
}

export interface TestOrganization {
  id: string
  name: string
  slug: string
}

export const TEST_ORGANIZATIONS: TestOrganization[] = [
  {
    id: 'org_30P9yxXysREHXm7vf5XhoGQ0K6u',
    name: 'org_test_e2e',
    slug: 'org_test_e2e-1753518598',
  },
  {
    id: 'test-company-2',
    name: 'Test Company 2',
    slug: 'test-company-2',
  },
]

export const TEST_USERS: TestUser[] = [
  {
    email: process.env.E2E_USER_EMAIL || 'test.user@company1.com',
    password: process.env.E2E_USER_PASSWORD || 'StupidDataBreachPWLock!',
    name: 'Test User',
    role: 'USER',
    organization: 'org_30P9yxXysREHXm7vf5XhoGQ0K6u',
  },
  {
    email: process.env.E2E_ADMIN_EMAIL || 'test.admin@company1.com',
    password: process.env.E2E_ADMIN_PASSWORD || 'StupidDataBreachPWLock!',
    name: 'Test Admin',
    role: 'ADMIN',
    organization: 'org_30P9yxXysREHXm7vf5XhoGQ0K6u',
  },
  {
    email: 'test.user@company2.com',
    password: 'StupidDataBreachPWLock!',
    name: 'Test User 2',
    role: 'USER',
    organization: 'test-company-2',
  },
  {
    email: 'test.superadmin@requesthub.com',
    password: 'SuperAdminPassword123SuperDuper321!',
    name: 'Test Super Admin',
    role: 'SUPER_ADMIN',
  },
]

export const getUserByRole = (
  role: TestUser['role'],
  organization?: string
): TestUser => {
  const user = TEST_USERS.find(
    (u) => u.role === role && (!organization || u.organization === organization)
  )

  if (!user) {
    throw new Error(
      `No test user found for role ${role} in organization ${organization}`
    )
  }

  return user
}

export const getUserByEmail = (email: string): TestUser => {
  const user = TEST_USERS.find((u) => u.email === email)

  if (!user) {
    throw new Error(`No test user found with email ${email}`)
  }

  return user
}
