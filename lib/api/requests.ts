import {
  getClerkOrganization,
  getClerkOrganizations,
} from '@/lib/auth/clerk-org'
import {
  createLinearTask,
  updateLinearTaskStatus,
} from '@/lib/integrations/linear'
import type {
  RequestCategory,
  RequestPriority,
  RequestStatus,
  RequestWithUser,
  User,
} from '@/types'
import { prisma } from '../database'

export type LinearTaskInfo = {
  id: string
  identifier: string
  url: string
}

export interface CreateRequestApiRequest {
  title: string
  description: string
  category: RequestCategory
  businessArea: string
  serviceType: string
  priority: RequestPriority
  dueDate?: Date
}

export interface UpdateRequestApiRequest {
  title?: string
  description?: string
  category?: RequestCategory
  businessArea?: string
  serviceType?: string
  priority?: RequestPriority
  status?: RequestStatus
  assignedToId?: string
  dueDate?: Date
  linearTaskId?: string
  linearUrl?: string
  estimatedHours?: number
  actualHours?: number
  completedAt?: Date
}

/**
 * Get all requests for a user (scoped to their organization)
 */
export const getRequestsForUser = async (
  user: User
): Promise<RequestWithUser[]> => {
  const requests = await prisma.request.findMany({
    where: { clerkOrgId: user.clerkOrgId },
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
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Get organization names from Clerk
  const orgs = await getClerkOrganizations()
  const orgMap = new Map(orgs.map((org) => [org.id, org]))

  // Transform to match RequestWithUser type
  return requests.map((request) => {
    const org = orgMap.get(request.clerkOrgId)
    return {
      ...request,
      user: request.user,
      assignedTo: request.assignedTo,
      organization: org ? { name: org.name } : undefined,
    }
  })
}

/**
 * Get a specific request by ID
 */
export const getRequestById = async (
  requestId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _userRole?: string
): Promise<RequestWithUser | null> => {
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
      assignedTo: {
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

  if (!request) return null

  // Get organization name from Clerk
  const org = await getClerkOrganization(request.clerkOrgId)

  // Transform to match RequestWithUser type
  return {
    ...request,
    user: request.user,
    assignedTo: request.assignedTo,
    organization: org ? { name: org.name } : undefined,
  }
}

/**
 * Create a new request
 */
export const createRequest = async (
  userId: string,
  data: CreateRequestApiRequest
): Promise<RequestWithUser & { linearTask?: LinearTaskInfo | null }> => {
  // Get user with organization info
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      clerkOrgId: true,
      name: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Get organization name from Clerk
  const org = await getClerkOrganization(user.clerkOrgId)

  // Map business area to category
  const categoryMap: Record<
    string,
    | 'HIRING'
    | 'SALES'
    | 'PRODUCT'
    | 'CAPITAL'
    | 'MARKETING'
    | 'OPERATIONS'
    | 'FINANCE'
    | 'LEGAL'
    | 'TECHNOLOGY'
    | 'STRATEGY'
    | 'OTHER'
  > = {
    hiring: 'HIRING',
    sales: 'SALES',
    product: 'PRODUCT',
    capital: 'CAPITAL',
    marketing: 'MARKETING',
    operations: 'OPERATIONS',
    finance: 'FINANCE',
    legal: 'LEGAL',
    technology: 'TECHNOLOGY',
    strategy: 'STRATEGY',
    other: 'OTHER',
  }

  const category = categoryMap[data.businessArea.toLowerCase()] || 'OTHER'

  // Create the request
  const newRequest = await prisma.request.create({
    data: {
      title: data.title,
      description: data.description,
      category: category as RequestCategory,
      businessArea: data.businessArea,
      serviceType: data.serviceType,
      priority: data.priority,
      status: 'SUBMITTED',
      clerkOrgId: user.clerkOrgId,
      userId: userId,
      dueDate: data.dueDate,
    },
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
      assignedTo: {
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

  // Create Linear task if organization has Linear configured
  let linearTask: LinearTaskInfo | null = null
  try {
    linearTask = await createLinearTask({
      title: `[${org?.name || 'Unknown Organization'}] ${data.title}`,
      description: data.description,
      category: data.businessArea,
      requestId: newRequest.id,
      companyName: org?.name || 'Unknown Organization',
      userId: userId,
    })

    // Update request with Linear task info
    if (linearTask) {
      await prisma.request.update({
        where: { id: newRequest.id },
        data: {
          linearTaskId: linearTask.id,
          linearUrl: linearTask.url,
        },
      })
    }
  } catch (error) {
    console.error('Failed to create Linear task:', error)
    // Continue without Linear task
  }

  // Transform to match RequestWithUser type
  return {
    ...newRequest,
    user: newRequest.user,
    assignedTo: newRequest.assignedTo,
    organization: org ? { name: org.name } : undefined,
    linearTask,
  }
}

/**
 * Update an existing request
 */
export const updateRequest = async (
  requestId: string,
  data: UpdateRequestApiRequest
): Promise<RequestWithUser> => {
  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      businessArea: data.businessArea,
      serviceType: data.serviceType,
      priority: data.priority,
      status: data.status,
      assignedToId: data.assignedToId,
      dueDate: data.dueDate,
      linearTaskId: data.linearTaskId,
      linearUrl: data.linearUrl,
      estimatedHours: data.estimatedHours,
      actualHours: data.actualHours,
      completedAt: data.completedAt,
    },
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
      assignedTo: {
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

  // Get organization name from Clerk
  const org = await getClerkOrganization(updatedRequest.clerkOrgId)

  // Transform to match RequestWithUser type
  return {
    ...updatedRequest,
    user: updatedRequest.user,
    assignedTo: updatedRequest.assignedTo,
    organization: org ? { name: org.name } : undefined,
  }
}

/**
 * Update request status
 */
export const updateRequestStatus = async (
  requestId: string,
  status: RequestStatus
): Promise<RequestWithUser> => {
  const updateData: { status: RequestStatus; completedAt?: Date | null } = {
    status,
  }

  // Set completedAt if status is COMPLETED
  if (status === 'COMPLETED') {
    updateData.completedAt = new Date()
  }

  // Clear completedAt if status is not COMPLETED
  if (status !== 'COMPLETED') {
    updateData.completedAt = null
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: updateData,
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
      assignedTo: {
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

  // Update Linear task status if Linear task exists
  if (updatedRequest.linearTaskId) {
    try {
      const linearUpdate = await updateLinearTaskStatus(
        updatedRequest.linearTaskId,
        status
      )

      if (linearUpdate.success) {
        console.log(
          `Linear task ${updatedRequest.linearTaskId} status updated to match request status: ${status}`
        )
      } else {
        console.warn(
          `Failed to update Linear task status: ${linearUpdate.error}`
        )
      }
    } catch (error) {
      console.error('❌ Error updating Linear task status:', error)
      // Continue with request update even if Linear fails
    }
  }

  // Get organization name from Clerk
  const org = await getClerkOrganization(updatedRequest.clerkOrgId)

  // Transform to match RequestWithUser type
  return {
    ...updatedRequest,
    user: updatedRequest.user,
    assignedTo: updatedRequest.assignedTo,
    organization: org ? { name: org.name } : undefined,
  }
}

/**
 * Delete a request
 */
export const deleteRequest = async (requestId: string): Promise<void> => {
  await prisma.request.delete({
    where: { id: requestId },
  })
}

/**
 * Get requests by status (for admin dashboard)
 */
export const getRequestsByStatus = async (
  status: RequestStatus,
  clerkOrgId?: string
): Promise<RequestWithUser[]> => {
  const whereClause: { status: RequestStatus; clerkOrgId?: string } = { status }

  if (clerkOrgId) {
    whereClause.clerkOrgId = clerkOrgId
  }

  const requests = await prisma.request.findMany({
    where: whereClause,
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
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Get organization names from Clerk
  const orgs = await getClerkOrganizations()
  const orgMap = new Map(orgs.map((org) => [org.id, org]))

  // Transform to match RequestWithUser type
  return requests.map((request) => {
    const org = orgMap.get(request.clerkOrgId)
    return {
      ...request,
      user: request.user,
      assignedTo: request.assignedTo,
      organization: org ? { name: org.name } : undefined,
    }
  })
}

/**
 * Assign an expert to a request
 */
export const assignExpert = async (
  requestId: string,
  expertId: string
): Promise<RequestWithUser> => {
  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { assignedToId: expertId },
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
      assignedTo: {
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

  // Get organization name from Clerk
  const org = await getClerkOrganization(updatedRequest.clerkOrgId)

  // Transform to match RequestWithUser type
  return {
    ...updatedRequest,
    user: updatedRequest.user,
    assignedTo: updatedRequest.assignedTo,
    organization: org ? { name: org.name } : undefined,
  }
}
