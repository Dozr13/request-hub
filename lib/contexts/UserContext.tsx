'use client'

import { ImpersonationUser, User, UserRole } from '@/types'
import { createContext, ReactNode, useContext } from 'react'
import { useImpersonation } from './ImpersonationContext'

interface UserContextType {
  user: User | null
  isImpersonating: boolean
  effectiveRole: UserRole | null
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
  user: User
  isImpersonating?: boolean
  currentlyImpersonating?: ImpersonationUser
}

export function UserProvider({
  children,
  user,
  isImpersonating = false,
  currentlyImpersonating,
}: UserProviderProps) {
  const { isImpersonating: contextImpersonating } = useImpersonation()

  // Use impersonated user if impersonating, otherwise use the provided user
  const effectiveUser =
    (isImpersonating || contextImpersonating) && currentlyImpersonating
      ? {
          id: currentlyImpersonating.id,
          name: currentlyImpersonating.name,
          email: currentlyImpersonating.email,
          imageUrl: currentlyImpersonating.imageUrl || null,
          role: currentlyImpersonating.role,
          clerkId: user.clerkId, // Keep original clerkId
          clerkOrgId: user.clerkOrgId, // Keep original clerkOrgId
          createdAt: user.createdAt, // Keep original timestamps
          updatedAt: user.updatedAt,
          organization: currentlyImpersonating.organization
            ? {
                name: currentlyImpersonating.organization.name,
              }
            : undefined,
        }
      : user

  const value: UserContextType = {
    user: effectiveUser,
    isImpersonating: isImpersonating || contextImpersonating,
    effectiveRole: effectiveUser.role,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
