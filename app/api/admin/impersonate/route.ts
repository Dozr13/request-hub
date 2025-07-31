import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { targetUserId } = await request.json()

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Target user ID required' },
        { status: 400 }
      )
    }

    // Check if current user is SUPER_ADMIN
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true, name: true, email: true },
    })

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        clerkOrgId: true,
      },
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      )
    }

    // Set impersonation cookies
    const cookieStore = await cookies()
    cookieStore.set('impersonating-user-id', targetUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 4, // 4 hours
    })

    // TODO: Add audit logging here
    console.log(
      `IMPERSONATION: ${currentUser.email} started impersonating ${targetUser.email}`
    )

    // Get organization info from Clerk
    const org = await getClerkOrganization(targetUser.clerkOrgId)

    return NextResponse.json({
      success: true,
      targetUser: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        organization: org ? { name: org.name } : undefined,
      },
    })
  } catch (error) {
    console.error('Error starting impersonation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Remove impersonation cookie
    const cookieStore = await cookies()
    cookieStore.delete('impersonating-user-id')

    // TODO: Add audit logging here
    console.log(`IMPERSONATION: Stopped impersonating (by ${userId})`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error stopping impersonation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
