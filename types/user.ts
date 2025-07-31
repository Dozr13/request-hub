import type { Role } from '@prisma/client'

export type UserRole = Role

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN'

// Clerk Organization interface - matches Clerk's organization structure
export interface ClerkOrganization {
  id: string
  name: string
  slug: string
  imageUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

// Base User interface - matches Prisma schema
export interface User {
  id: string
  clerkId: string
  email: string
  name: string | null
  imageUrl: string | null
  initials?: string | null
  role: UserRole
  clerkOrgId: string // Required - links to Clerk organization
  createdAt: Date
  updatedAt: Date
  organization?: {
    name: string // From Clerk organization
  }
}

// User with organization metadata (from our DB)
export interface UserWithOrganization extends Omit<User, 'organization'> {
  organization?: OrganizationMeta
}

// Organization metadata - only for extra fields not in Clerk
export interface OrganizationMeta {
  clerkOrgId: string
  onboardingComplete: boolean
  industry?: string | null
  employeeCount?: number | null
  founded?: Date | null
  headquarters?: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Simple user for display purposes
export interface SimpleUser {
  id: string
  name: string | null
  email: string
  imageUrl: string | null
  role: UserRole
  organization?: {
    name: string // From Clerk organization
  }
}

// User for impersonation context
export interface ImpersonationUser {
  id: string
  clerkId: string
  email: string
  name: string
  role: UserRole
  clerkOrgId: string
  imageUrl?: string | null
  organization?: {
    id: string
    name: string
    slug: string
  } | null
}

// * <MAY NEED THIS

// // User for impersonation context
// export interface ImpersonationUser {
//   id: string
//   name: string | null
//   email: string
//   imageUrl: string | null
//   role: UserRole
//   organization?: {
//     name: string // From Clerk organization
//   }
// }

// Request with user and organization info
export interface RequestWithUser {
  id: string
  title: string
  description: string
  category: string
  businessArea?: string | null
  serviceType?: string | null
  status: string
  priority: string
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
    role: UserRole
  }
  assignedTo?: {
    id: string
    name: string | null
    email: string
    imageUrl: string | null
    role: UserRole
  } | null
  organization?: {
    name: string // From Clerk organization
  }
}

export interface RequestsPageClientProps {
  user: UserWithOrganization
}
