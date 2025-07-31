import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import { getUserInitials } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clerkId: string }> }
) {
  try {
    const { clerkId } = await params

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        initials: true,
        role: true,
        clerkOrgId: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get organization info from Clerk
    const org = await getClerkOrganization(user.clerkOrgId)

    // Ensure initials are set
    const initials = user.initials || getUserInitials(user.name)

    return NextResponse.json({
      ...user,
      initials,
      organization: org
        ? {
            name: org.name,
            logo: org.imageUrl,
          }
        : null,
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
