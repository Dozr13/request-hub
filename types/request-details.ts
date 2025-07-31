import type { RequestCategory, RequestPriority, RequestStatus } from './request'

export interface RequestDetailsOrganization {
  name: string // From Clerk organization
}

export interface RequestDetails {
  id: string
  title: string
  description: string
  category: RequestCategory
  businessArea: string
  serviceType: string
  status: RequestStatus
  priority: RequestPriority
  clerkOrgId: string
  userId: string
  assignedToId?: string | null
  linearTaskId?: string | null
  linearUrl?: string | null
  estimatedHours?: number | null
  actualHours?: number | null
  dueDate?: Date | null
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string | null
    email: string
    imageUrl: string | null
    role: string
  }
  assignedTo?: {
    id: string
    name: string | null
    email: string
    imageUrl: string | null
    role: string
  } | null
  organization?: RequestDetailsOrganization
  messages: RequestMessage[]
  files: RequestFile[]
  meetingInfo?: RequestMeetingInfo
}

export interface RequestMessage {
  id: string
  content: string
  isSystem: boolean
  createdAt: Date
  sender: {
    id: string
    name: string | null
    email: string
    imageUrl: string | null
  }
}

export interface RequestFile {
  id: string
  name: string
  originalName: string
  mimeType: string
  size: number
  url: string
  createdAt: Date
}

export interface RequestMeetingInfo {
  scheduledAt: Date
  duration: number
  meetingUrl?: string
  notes?: string
}
