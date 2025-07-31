import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { prisma } from '../database'

export const getCurrentUser = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId ?? '' },
    include: { organization: true },
  })

  if (!user) {
    redirect('/')
  }

  return user
}

export const getAuthContext = async (request?: NextRequest) => {
  const { userId, orgId, orgRole } = await auth()

  // For API routes, try to get from headers
  const userIdFromHeader = request?.headers.get('x-user-id')
  const orgIdFromHeader = request?.headers.get('x-org-id')
  const orgRoleFromHeader = request?.headers.get('x-org-role')

  return {
    userId: userId || userIdFromHeader,
    orgId: orgId || orgIdFromHeader,
    orgRole: orgRole || orgRoleFromHeader,
  }
}

export const getUserWithOrganization = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: { clerkId },
    include: {
      organization: true,
    },
  })
}

export const requireAuth = async (request?: NextRequest) => {
  const { userId, orgId, orgRole } = await getAuthContext(request)

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return { userId, orgId, orgRole }
}

export const requireAdmin = async (request?: NextRequest) => {
  const { userId, orgId, orgRole } = await requireAuth(request)

  if (orgRole !== 'org:admin' && orgRole !== 'org:super_admin') {
    throw new Error('Admin access required')
  }

  return { userId, orgId, orgRole }
}
