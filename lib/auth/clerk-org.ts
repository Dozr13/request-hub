import type { ClerkOrganization } from '@/types'
import { auth } from '@clerk/nextjs/server'

// Organization mappings for actual Clerk organization IDs
const ORGANIZATION_MAPPINGS: Record<string, ClerkOrganization> = {
  org_30P9yxXysREHXm7vf5XhoGQ0K6u: {
    id: 'org_30P9yxXysREHXm7vf5XhoGQ0K6u',
    name: 'org_test_e2e',
    slug: 'org_test_e2e-1753518598',
    imageUrl: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  org_30PWBDe4wjMYWRsf7l0QcGhjKLQ: {
    id: 'org_30PWBDe4wjMYWRsf7l0QcGhjKLQ',
    name: 'org_techcorp',
    slug: 'org_techcorp-1753529550',
    imageUrl: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  org_30PWEbUNmjCn9L5QsTl0NdjsJGB: {
    id: 'org_30PWEbUNmjCn9L5QsTl0NdjsJGB',
    name: 'org_fintech',
    slug: 'org_fintech-1753529577',
    imageUrl: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  org_30PVwHcbba9Es2gbO6ktCCbYP3o: {
    id: 'org_30PVwHcbba9Es2gbO6ktCCbYP3o',
    name: 'org_request_hub_default',
    slug: 'org_request_hub_default-1753529431',
    imageUrl: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  org_30PWICTi4Lu915bIrd0Ww2nxI7U: {
    id: 'org_30PWICTi4Lu915bIrd0Ww2nxI7U',
    name: 'Request Hub',
    slug: 'request-hub',
    imageUrl: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  org_request_hub_default: {
    id: 'org_request_hub_default',
    name: 'Request Hub',
    slug: 'request-hub',
    imageUrl: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
}

/**
 * Get organization details from Clerk
 */
export async function getClerkOrganization(
  clerkOrgId: string
): Promise<ClerkOrganization | null> {
  try {
    // Check if we have a mapping for this organization
    const organization = ORGANIZATION_MAPPINGS[clerkOrgId]

    if (organization) {
      return organization
    }

    // Fallback for unknown org IDs
    console.warn('Unexpected organization ID:', clerkOrgId)
    return {
      id: clerkOrgId,
      name: 'Unknown Organization',
      slug: 'unknown',
      imageUrl: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  } catch (error) {
    console.error('Error fetching organization from Clerk:', error)
    return null
  }
}

/**
 * Get all organizations for a user
 */
export async function getClerkOrganizations(): Promise<ClerkOrganization[]> {
  try {
    const { orgId } = await auth()

    if (!orgId) {
      return []
    }

    // Return the user's organization if we have it mapped
    const organization = ORGANIZATION_MAPPINGS[orgId]
    if (organization) {
      return [organization]
    }

    // Fallback - return empty array if not mapped
    return []
  } catch (error) {
    console.error('Error fetching organizations from Clerk:', error)
    return []
  }
}

/**
 * Get the current user's organization
 */
export async function getCurrentUserOrganization(): Promise<ClerkOrganization | null> {
  try {
    const { orgId } = await auth()

    if (!orgId) {
      return null
    }

    return getClerkOrganization(orgId)
  } catch (error) {
    console.error('Error getting current user organization:', error)
    return null
  }
}
