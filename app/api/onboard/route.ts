import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

interface OnboardingData {
  organizationName: string
  industry?: string
  employeeCount?: number
  headquarters?: string
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    const clerkUser = await currentUser()

    if (!userId || !clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (existingUser) {
      // Get organization info from Clerk
      const org = await getClerkOrganization(existingUser.clerkOrgId)

      return NextResponse.json({
        success: true,
        message: 'User already onboarded',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          organization: org ? { name: org.name } : null,
        },
      })
    }

    const body = await request.json()
    const {
      organizationName,
      industry,
      employeeCount,
      headquarters,
    }: OnboardingData = body

    if (!organizationName) {
      return NextResponse.json(
        {
          error: 'Organization name is required',
        },
        { status: 400 }
      )
    }

    // For now, we'll use a default organization since we need to set up Clerk organizations
    // In production, this would create a new Clerk organization
    const defaultOrgId = 'org_htv_default'

    // Check if organization metadata exists
    let orgMeta = await prisma.organizationMeta.findUnique({
      where: { clerkOrgId: defaultOrgId },
    })

    if (!orgMeta) {
      // Create organization metadata
      orgMeta = await prisma.organizationMeta.create({
        data: {
          clerkOrgId: defaultOrgId,
          onboardingComplete: true,
          industry: industry || 'Technology',
          employeeCount: employeeCount || 1,
          headquarters: headquarters || 'Remote',
        },
      })
    }

    // Create the user as the organization admin
    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        email:
          clerkUser.emailAddresses[0]?.emailAddress || `${userId}@unknown.com`,
        name:
          clerkUser.firstName && clerkUser.lastName
            ? `${clerkUser.firstName} ${clerkUser.lastName}`
            : clerkUser.firstName || clerkUser.lastName || 'User',
        imageUrl: clerkUser.imageUrl || null,
        role: 'ADMIN', // Organization founder gets admin role
        clerkOrgId: defaultOrgId,
      },
    })

    // Create notification preferences
    await prisma.notificationPreference.create({
      data: {
        userId: user.id,
        clerkOrgId: defaultOrgId,
        inApp: true,
        email: true,
        enabled: true,
      },
    })

    // Get organization info from Clerk
    const org = await getClerkOrganization(defaultOrgId)

    return NextResponse.json({
      success: true,
      message: 'User onboarded successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: org ? { name: org.name } : null,
      },
    })
  } catch (error) {
    console.error('Error in onboarding:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
