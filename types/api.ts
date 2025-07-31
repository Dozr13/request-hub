import { UserRole } from './user'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ErrorResponse {
  success: false
  error: string
  message?: string
  statusCode?: number
}

// Request-related API types
export interface CreateRequestApiRequest {
  title: string
  description: string
  businessArea: string
  service: string
  scheduledTime: string
  expertId?: string
}

export interface UpdateRequestApiRequest {
  title?: string
  description?: string
  status?:
    | 'SUBMITTED'
    | 'ACTION_REQUIRED'
    | 'IN_PROGRESS'
    | 'REVIEWING'
    | 'COMPLETED'
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
}

// User-related API types
export interface CreateUserApiRequest {
  clerkId: string
  email: string
  name: string
  imageUrl?: string
  companyId?: string
}

export interface UpdateUserApiRequest {
  name?: string
  email?: string
  imageUrl?: string
  role?: UserRole
  companyId?: string
}

// Linear webhook types
export interface LinearWebhookPayload {
  action: string
  data: {
    id: string
    title?: string
    description?: string
    state?: {
      name: string
      type: string
    }
    assignee?: {
      id: string
      name: string
      email: string
    }
  }
  url?: string
  organizationId?: string
  webhookTimestamp: number
}

// Health check types
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  services: {
    database: 'up' | 'down'
    clerk: 'up' | 'down'
    pusher: 'up' | 'down'
    linear?: 'up' | 'down'
  }
}
