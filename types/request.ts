export type RequestStatus =
  | 'SUBMITTED'
  | 'IN_PROGRESS'
  | 'REVIEWING'
  | 'COMPLETED'
  | 'ACTION_REQUIRED'

export type RequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export type RequestCategory =
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

export interface Request {
  id: string
  title: string
  description: string
  category: RequestCategory
  businessArea: string
  serviceType: string
  status: RequestStatus
  priority: RequestPriority
  userId: string
  assignedToId?: string | null
  clerkOrgId: string
  dueDate?: Date | null
  linearTaskId?: string | null
  createdAt: Date
  updatedAt: Date
}
