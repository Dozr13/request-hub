import { IconName } from '@/lib/ui/icons'
import { Priority, RequestCategory } from '@prisma/client'
import type { UserWithOrganization } from './user'

export type DialogStep =
  | 'business-area'
  | 'marketing'
  | 'sales'
  | 'operations'
  | 'finance'
  | 'details'
  | 'time'

export interface ServiceItem {
  name: string
  description: string
  popular?: boolean
  icon?: IconName
}

export interface BusinessAreaItem {
  name: string
  description: string
  count: number
  icon: IconName
  step: DialogStep
  services: ServiceItem[]
}

export interface RequestFormData {
  businessArea: string
  service: string
  title: string
  description: string
  category: RequestCategory
  priority: Priority
  files: File[]
  scheduledDate?: Date
  duration?: string
  location?: string
}

export interface NewRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUser?: UserWithOrganization
}

export interface UserInfo {
  id: string
  name: string
  imageUrl?: string | null
  role?: string
}

export interface FormErrors {
  title?: string
  description?: string
  category?: string
  priority?: string
}
