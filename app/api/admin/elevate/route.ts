import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isDevelopment = process.env.NODE_ENV === 'development'

export async function POST() {
  try {
    const { userId } = await auth()
    const clerkUser = await currentUser()

    if (!userId || !clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      // In production, users should be properly onboarded through an organization
      if (!isDevelopment) {
        return NextResponse.json(
          {
            error:
              'User not found. Please complete your organization onboarding first.',
          },
          { status: 404 }
        )
      }

      // For development, use a default organization
      const defaultOrgId = 'org_htv_default'

      // Create the user in development
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email:
            clerkUser.emailAddresses[0]?.emailAddress ||
            `${userId}@unknown.com`,
          name:
            clerkUser.firstName && clerkUser.lastName
              ? `${clerkUser.firstName} ${clerkUser.lastName}`
              : clerkUser.firstName || clerkUser.lastName || 'User',
          imageUrl: clerkUser.imageUrl || null,
          role: 'SUPER_ADMIN',
          clerkOrgId: defaultOrgId,
        },
      })
    } else {
      // Update existing user to super admin (only in development)
      if (isDevelopment && user.role !== 'SUPER_ADMIN') {
        // If user doesn't have an organization, assign the default one
        const updateData: { role: 'SUPER_ADMIN'; clerkOrgId?: string } = {
          role: 'SUPER_ADMIN',
        }

        if (!user.clerkOrgId) {
          const defaultOrgId = 'org_htv_default'
          updateData.clerkOrgId = defaultOrgId
        }

        user = await prisma.user.update({
          where: { clerkId: userId },
          data: updateData,
        })
      }
    }

    const isNewlyElevated = user.role === 'SUPER_ADMIN'

    // Get organization info from Clerk
    const org = await getClerkOrganization(user.clerkOrgId)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        role: user.role,
        clerkOrgId: user.clerkOrgId,
        organization: org
          ? {
              id: org.id,
              name: org.name,
              slug: org.slug,
              imageUrl: org.imageUrl,
            }
          : null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      isNewlyElevated,
      message: isNewlyElevated
        ? 'User elevated to SUPER_ADMIN successfully'
        : 'User is already a SUPER_ADMIN',
    })
  } catch (error) {
    console.error('Error in elevate route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
