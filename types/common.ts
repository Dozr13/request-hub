import { RequestStatus } from './request'

// Common utility types
export type Status = 'idle' | 'loading' | 'success' | 'error'

// Form-related types
export interface FormField<T = string> {
  value: T
  error?: string
  touched?: boolean
}

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface FormState<T extends Record<string, unknown>> {
  fields: {
    [K in keyof T]: FormField<T[K]>
  }
  isValid: boolean
  isSubmitting: boolean
  isDirty: boolean
}

// Pagination
export interface PaginationOptions {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Filter options
export interface FilterOptions {
  search?: string
  status?: RequestStatus[]
  priority?: RequestPriority[]
  dateFrom?: Date
  dateTo?: Date
  assigneeId?: string
  businessArea?: string
}

// Navigation types
export interface NavigationItem {
  name: string
  href: string
  icon?: string
  description?: string
  badge?: number
  disabled?: boolean
}

// Business area and service types
export interface BusinessArea {
  id: string
  name: string
  description: string
  icon: string
  services: Service[]
  isActive: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  icon?: string
  businessAreaId: string
  estimatedDuration?: number // in minutes
  isPopular?: boolean
  isActive: boolean
}

// Time slot types
export interface TimeSlot {
  id: string
  start: Date
  end: Date
  isAvailable: boolean
  expertId?: string
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  actionUrl?: string
}

// File upload types
export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}
