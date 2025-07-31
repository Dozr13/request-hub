import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { RequestCategory, RequestPriority, RequestStatus } from '@/types'
import { RequestDetails } from '@/types'

interface PrismaRequestWithUser {
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

export async function transformToRequestDetails(
  request: PrismaRequestWithUser
): Promise<RequestDetails> {
  // Get organization name from Clerk
  const clerkOrg = await getClerkOrganization(request.clerkOrgId)

  return {
    id: request.id,
    title: request.title,
    description: request.description || '',
    status: request.status as RequestStatus,
    category: request.category as RequestCategory,
    businessArea: request.businessArea || '',
    serviceType: request.serviceType || '',
    priority: request.priority as RequestPriority,
    clerkOrgId: request.clerkOrgId,
    userId: request.userId,
    assignedToId: request.assignedToId,
    linearTaskId: request.linearTaskId,
    linearUrl: request.linearUrl,
    estimatedHours: request.estimatedHours,
    actualHours: request.actualHours,
    dueDate: request.dueDate,
    completedAt: request.completedAt,
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
    user: {
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
      imageUrl: request.user.imageUrl,
      role: request.user.role,
    },
    organization: clerkOrg
      ? {
          name: clerkOrg.name,
        }
      : undefined,
    messages: [],
    files: [],
  }
}
