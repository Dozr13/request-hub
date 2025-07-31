'use client'

import { UserRole } from '@/types'
import { createContext, useContext } from 'react'

interface ImpersonationContextType {
  isImpersonating: boolean
  impersonatedUser?: {
    id: string
    name: string
    email: string
    role: UserRole
    organization?: { name: string }
  }
  impersonatorId?: string
}

const ImpersonationContext = createContext<ImpersonationContextType | null>(
  null
)

export function useImpersonation() {
  const context = useContext(ImpersonationContext)
  if (!context) {
    throw new Error(
      'useImpersonation must be used within ImpersonationProvider'
    )
  }
  return context
}

export function ImpersonationProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: ImpersonationContextType
}) {
  return (
    <ImpersonationContext.Provider value={value}>
      {children}
    </ImpersonationContext.Provider>
  )
}
