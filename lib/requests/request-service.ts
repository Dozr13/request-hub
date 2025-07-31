import { getEffectivePermissions } from '@/lib/config/impersonation'
import { prisma } from '@/lib/database'
import { UserRole } from '@/types'

interface GetRequestDetailsParams {
  requestId: string
  effectiveUserId: string
  userRole: UserRole
  userClerkOrgId: string
  originalUserRole?: string
  isImpersonating?: boolean
}

interface RequestResult {
  request?: {
    id: string
    title: string
    description: string | null
    status: string
    category: string
    businessArea: string | null
    serviceType: string | null
    priority: string
    clerkOrgId: string
    userId: string
    assignedToId: string | null
    linearTaskId: string | null
    linearUrl: string | null
    estimatedHours: number | null
    actualHours: number | null
    dueDate: Date | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    user: {
      id: string
      name: string | null
      email: string
      imageUrl: string | null
      role: string
    }
  }
  error?: 'NOT_FOUND' | 'ACCESS_DENIED'
}

export async function getRequestDetails({
  requestId,
  effectiveUserId,
  userRole,
  userClerkOrgId,
  originalUserRole,
  isImpersonating = false,
}: GetRequestDetailsParams): Promise<RequestResult> {
  const request = await prisma.request.findUnique({
    where: { id: requestId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          role: true,
        },
      },
    },
  })

  if (!request) {
    return { error: 'NOT_FOUND' }
  }

  const permissions = getEffectivePermissions({
    effectiveUser: { role: userRole, clerkOrgId: userClerkOrgId },
    originalUserRole,
    isImpersonating,
  })

  // Check access permissions
  const canAccessAllOrgs = permissions.canAccessAllOrgs
  const sameOrg = request.clerkOrgId === permissions.orgId
  const ownRequest = request.userId === effectiveUserId

  // Permission logic:
  // - SUPER_ADMIN: Can access all requests across all orgs
  // - ADMIN: Can access all requests within their organization
  // - USER: Can ONLY access their own requests
  const canAccess =
    canAccessAllOrgs || (userRole === 'ADMIN' && sameOrg) || ownRequest

  if (!canAccess) {
    return { error: 'ACCESS_DENIED' }
  }

  return { request }
}

export async function getUserWithOrgId(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      clerkOrgId: true,
      role: true,
    },
  })
}
