import type { UserRole, UserWithOrganization } from '@/types'
import type { User as ClerkUser } from '@clerk/nextjs/server'
import type { OrganizationMeta, User } from '@prisma/client'
import { prisma } from '../database'

export type UserWithCompany = UserWithOrganization

/**
 * Ensure a user exists in the database for the given Clerk user
 */
export const ensureUserExists = async (
  userId: string,
  clerkUser: ClerkUser
): Promise<UserWithCompany> => {
  try {
    // Ensure default company exists first
    const company = await ensureDefaultCompanyExists()

    // Use upsert to handle race conditions
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        // Update user info in case it changed in Clerk
        email:
          clerkUser.emailAddresses[0]?.emailAddress || `${userId}@unknown.com`,
        name:
          clerkUser.firstName && clerkUser.lastName
            ? `${clerkUser.firstName} ${clerkUser.lastName}`
            : clerkUser.firstName || clerkUser.lastName || 'User',
        imageUrl: clerkUser.imageUrl || null,
      },
      create: {
        clerkId: userId,
        email:
          clerkUser.emailAddresses[0]?.emailAddress || `${userId}@unknown.com`,
        name:
          clerkUser.firstName && clerkUser.lastName
            ? `${clerkUser.firstName} ${clerkUser.lastName}`
            : clerkUser.firstName || clerkUser.lastName || 'User',
        imageUrl: clerkUser.imageUrl || null,
        role: 'USER',
        clerkOrgId: company.clerkOrgId,
      },
      include: { organization: true },
    })

    return user
  } catch (error) {
    console.error('  Error ensuring user exists:', error)
    throw new Error('Failed to create user account')
  }
}

/**
 * Ensure the default organization exists
 */
export const ensureDefaultCompanyExists =
  async (): Promise<OrganizationMeta> => {
    const defaultOrgId = 'org_htv_default'

    let org = await prisma.organizationMeta.findUnique({
      where: { clerkOrgId: defaultOrgId },
    })

    if (!org) {
      console.log('🔨 Creating default organization')
      org = await prisma.organizationMeta.create({
        data: {
          clerkOrgId: defaultOrgId,
          onboardingComplete: false,
        },
      })
    }

    return org
  }

/**
 * Get user by Clerk ID
 */
export const getUserByClerkId = async (
  clerkId: string
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { clerkId },
    include: { organization: true },
  })
}

/**
 * Get all HTV experts (excluding test users)
 */
export const getHtvExperts = async (): Promise<User[]> => {
  return prisma.user.findMany({
    where: {
      role: {
        in: ['ADMIN', 'SUPER_ADMIN'],
      },
      // Filter out test users by ID pattern and email
      AND: [
        {
          NOT: {
            id: {
              startsWith: 'test_',
            },
          },
        },
        {
          NOT: {
            email: {
              endsWith: '@company1.com', // Filters out test emails
            },
          },
        },
      ],
    },
    orderBy: [
      { role: 'desc' }, // SUPER_ADMIN first
      { name: 'asc' },
    ],
  })
}

/**
 * Get all users for impersonation dropdown (excludes test users)
 */
export const getUsersForImpersonation = async (): Promise<
  UserWithCompany[]
> => {
  try {
    return await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: {
                startsWith: 'test_', // Filters out test user IDs
              },
            },
          },
          {
            NOT: {
              email: {
                endsWith: '@company1.com', // Filters out test emails
              },
            },
          },
        ],
      },
      include: {
        organization: true,
      },
      orderBy: [{ name: 'asc' }],
    })
  } catch (error) {
    console.error('  Error fetching users for impersonation:', error)
    throw new Error('Failed to fetch users for impersonation')
  }
}

/**
 * Update user role
 */
export const updateUserRole = async (
  userId: string,
  role: UserRole
): Promise<User> => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    include: { organization: true },
  })
}

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  data: { name?: string; email?: string; imageUrl?: string }
): Promise<User> => {
  return prisma.user.update({
    where: { id: userId },
    data,
    include: { organization: true },
  })
}
