import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { UserRole } from '../constants/navigation'
import { prisma } from '../database'

const REQUEST_HUB_ORGANIZATION_ID = 'org_30PVwHcbba9Es2gbO6ktCCbYP3o'

export interface ImpersonationContext {
  effectiveUser: {
    id: string
    clerkId: string
    email: string
    name: string
    role: UserRole
    clerkOrgId: string
    imageUrl?: string | null
  }
  isImpersonating: boolean
  impersonatorId?: string
  originalUserRole?: UserRole
  organization?: {
    id: string
    name: string
    slug: string
  } | null
}

// Helper function to determine user role based on email domain and Clerk role
function determineUserRole(email: string, clerkOrgRole?: string): UserRole {
  // Request Hub employees (internal team) get SUPER_ADMIN
  if (email.endsWith('@requesthub.com') || email.endsWith('@requesthub.com')) {
    return 'SUPER_ADMIN'
  }

  // Portfolio company founders get ADMIN (based on Clerk org role)
  if (clerkOrgRole === 'org:admin') {
    return 'ADMIN'
  }

  // Portfolio company employees get USER
  return 'USER'
}

// Separate function for user creation/onboarding (not impersonation)
export async function ensureUserExists(
  clerkId: string,
  orgId?: string,
  orgRole?: string
) {
  try {
    // Skip fake/seed users that aren't real Clerk IDs
    if (!clerkId.startsWith('user_')) {
      console.log('Skipping non-Clerk user ID:', clerkId)
      return null
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (user) {
      return user
    }

    // Skip Clerk API calls for seed users (they're in database but not in Clerk)
    if (
      clerkId.includes('_admin_') ||
      clerkId.includes('_techcorp_') ||
      clerkId.includes('_fintech_')
    ) {
      console.log('Using database user for seed user:', clerkId)
      return user
    }

    // Get user info from Clerk
    const clerkUser = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    })
      .then((res) => res.json())
      .catch(() => null)

    if (!clerkUser?.email_addresses?.[0]?.email_address) {
      throw new Error('No email found for user')
    }

    const email = clerkUser.email_addresses[0].email_address
    const userRole = determineUserRole(email, orgRole)

    // Ensure organization metadata exists
    await prisma.organizationMeta.upsert({
      where: { clerkOrgId: REQUEST_HUB_ORGANIZATION_ID },
      update: {},
      create: {
        clerkOrgId: REQUEST_HUB_ORGANIZATION_ID,
        onboardingComplete: true,
      },
    })

    // Check if user exists by email (for seed data compatibility)
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUserByEmail) {
      // Update existing user with new clerkId
      user = await prisma.user.update({
        where: { email },
        data: {
          clerkId,
          name:
            clerkUser.first_name && clerkUser.last_name
              ? `${clerkUser.first_name} ${clerkUser.last_name}`
              : clerkUser.first_name || clerkUser.last_name || 'User',
          imageUrl: clerkUser.image_url,
        },
      })
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name:
            clerkUser.first_name && clerkUser.last_name
              ? `${clerkUser.first_name} ${clerkUser.last_name}`
              : clerkUser.first_name || clerkUser.last_name || 'User',
          imageUrl: clerkUser.image_url,
          role: userRole,
          clerkOrgId: REQUEST_HUB_ORGANIZATION_ID,
        },
      })
    }

    return user
  } catch (error) {
    console.error('Error ensuring user exists:', error)
    throw error
  }
}

export const getImpersonationContext = cache(
  async (): Promise<ImpersonationContext | null> => {
    try {
      const { userId, orgId, orgRole } = await auth()

      if (!userId) {
        return null
      }

      // Check for impersonation cookies
      const cookieStore = await cookies()
      const impersonatingUserId = cookieStore.get(
        'impersonating-user-id'
      )?.value

      let effectiveUser
      let isImpersonating = false
      let originalUserRole: UserRole | undefined

      if (impersonatingUserId) {
        // IMPERSONATION MODE: Get the target user from database
        console.log('Impersonating user:', impersonatingUserId)

        const targetUser = await prisma.user.findUnique({
          where: { id: impersonatingUserId },
        })

        if (!targetUser) {
          console.error(
            'Target user for impersonation not found:',
            impersonatingUserId
          )
          // Clear invalid impersonation
          const cookieStore = await cookies()
          cookieStore.delete('impersonating-user-id')
          return null
        }

        effectiveUser = targetUser
        isImpersonating = true

        // Get original user's role
        const originalUser = await prisma.user.findUnique({
          where: { clerkId: userId },
          select: { role: true },
        })
        originalUserRole = originalUser?.role
      } else {
        // NORMAL MODE: Get or create the authenticated user
        effectiveUser = await ensureUserExists(userId, orgId, orgRole)
      }

      if (!effectiveUser) {
        return null
      }

      // Get organization info from Clerk if available
      let organization = null
      if (orgId) {
        try {
          const orgResponse = await fetch(
            `https://api.clerk.com/v1/organizations/${orgId}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
              },
            }
          )

          if (orgResponse.ok) {
            const orgData = await orgResponse.json()
            organization = {
              id: orgData.id,
              name: orgData.name,
              slug: orgData.slug,
            }
          }
        } catch (error) {
          console.warn('Failed to fetch organization data:', error)
        }
      }

      return {
        effectiveUser: {
          id: effectiveUser.id,
          clerkId: effectiveUser.clerkId,
          email: effectiveUser.email,
          name: effectiveUser.name || 'User',
          role: effectiveUser.role,
          clerkOrgId: effectiveUser.clerkOrgId,
          imageUrl: effectiveUser.imageUrl,
        },
        isImpersonating,
        impersonatorId: isImpersonating ? userId : undefined,
        originalUserRole,
        organization,
      }
    } catch (error) {
      console.error('Error getting impersonation context:', error)
      return null
    }
  }
)
