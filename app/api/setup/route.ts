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

    // Use default organization
    const defaultOrgId = 'org_request_hub_default'

    // Check if default organization metadata exists
    let defaultOrgMeta = await prisma.organizationMeta.findFirst({
      where: { clerkOrgId: defaultOrgId },
    })

    if (!defaultOrgMeta) {
      // Only create organization metadata in development or with explicit permission
      if (!isDevelopment) {
        return NextResponse.json(
          {
            error:
              'Default organization not found. Please contact admin to set up your organization.',
          },
          { status: 404 }
        )
      }

      defaultOrgMeta = await prisma.organizationMeta.create({
        data: {
          clerkOrgId: defaultOrgId,
          onboardingComplete: true,
          industry: 'Technology',
          employeeCount: 1,
          headquarters: 'Remote',
        },
      })
    }

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
        clerkOrgId: defaultOrgId,
      },
    })

    // Create sample data only in development
    let sampleDataCreated = false
    if (isDevelopment) {
      const existingRequests = await prisma.request.count()

      if (existingRequests === 0) {
        await prisma.request.createMany({
          data: [
            {
              title: 'Setup Development Environment',
              description: 'Initial development setup and configuration.',
              category: 'TECHNOLOGY',
              businessArea: 'tech',
              serviceType: 'Development Setup',
              status: 'COMPLETED',
              priority: 'LOW',
              userId: user.id,
              clerkOrgId: defaultOrgId,
            },
          ],
        })
        sampleDataCreated = true
      }
    }

    // Get organization info from Clerk
    const org = await getClerkOrganization(defaultOrgId)

    return NextResponse.json({
      success: true,
      message: isDevelopment
        ? 'Development setup complete!'
        : 'User account initialized',
      environment: process.env.NODE_ENV,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: org ? { name: org.name } : null,
      },
      sampleDataCreated,
    })
  } catch (error) {
    console.error('Error in setup:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
