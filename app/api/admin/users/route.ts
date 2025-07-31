import { getUsersForImpersonation } from '@/lib/api/user'
import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is SUPER_ADMIN
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true },
    })

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get all users for impersonation (excluding test users AND current user)
    const users = await getUsersForImpersonation()

    // Filter out the current user
    const filteredUsers = users.filter((user) => user.id !== currentUser.id)

    // Format for frontend
    const formattedUsers = await Promise.all(
      filteredUsers.map(async (user) => {
        const org = await getClerkOrganization(user.clerkOrgId)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          imageUrl: user.imageUrl,
          role: user.role,
          organization: org
            ? {
                name: org.name,
              }
            : null,
        }
      })
    )

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users for impersonation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
