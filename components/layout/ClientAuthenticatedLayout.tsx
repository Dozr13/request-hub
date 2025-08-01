'use client'

import { ImpersonationBanner } from '@/components/admin/impersonation/ImpersonationBanner'
import { PermissionIndicator } from '@/components/admin/impersonation/PermissionIndicator'
import { Navbar } from '@/components/navbar'
import { ImpersonationProvider } from '@/lib/contexts/ImpersonationContext'
import { UserProvider } from '@/lib/contexts/UserContext'
import { getUserInitials } from '@/lib/utils'
import type { ImpersonationUser, User } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

interface ClientAuthenticatedLayoutProps {
  children: React.ReactNode
}

interface ImpersonationContext {
  effectiveUser: User
  isImpersonating: boolean
  originalUserRole?: string
  organization?: {
    id: string
    name: string
    slug: string
  }
  impersonatorId?: string
}

export function ClientAuthenticatedLayout({
  children,
}: ClientAuthenticatedLayoutProps) {
  const { user: clerkUser, isLoaded } = useUser()
  const [impersonationContext, setImpersonationContext] =
    useState<ImpersonationContext | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getImpersonationData() {
      try {
        const response = await fetch('/api/auth/context')
        if (response.ok) {
          const data = await response.json()
          setImpersonationContext(data)
        }
      } catch (error) {
        console.error('Failed to get impersonation context:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded && clerkUser) {
      getImpersonationData()
    } else if (isLoaded && !clerkUser) {
      setLoading(false)
    }
  }, [isLoaded, clerkUser])

  // Show loading state
  if (loading || !isLoaded) {
    return (
      <div className="bg-request-hub-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign-in if not authenticated
  if (!clerkUser || !impersonationContext) {
    window.location.href = '/sign-in'
    return null
  }

  const { effectiveUser, isImpersonating, originalUserRole, organization } =
    impersonationContext

  // Create navbar user object with effective user data
  const navbarUser: User = {
    id: effectiveUser.id,
    name: effectiveUser.name,
    email: effectiveUser.email,
    imageUrl: effectiveUser.imageUrl || null,
    initials: effectiveUser.name ? getUserInitials(effectiveUser.name) : null,
    role: effectiveUser.role,
    clerkId: effectiveUser.clerkId,
    clerkOrgId: effectiveUser.clerkOrgId,
    organization: organization
      ? {
          name: organization.name,
        }
      : undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Prepare impersonation data for navbar
  const currentlyImpersonating: ImpersonationUser | undefined = isImpersonating
    ? {
        id: effectiveUser.id,
        clerkId: effectiveUser.clerkId,
        name: effectiveUser.name || 'Unknown User',
        email: effectiveUser.email,
        imageUrl: effectiveUser.imageUrl,
        role: effectiveUser.role,
        clerkOrgId: effectiveUser.clerkOrgId,
        organization: organization
          ? {
              id: organization.id,
              name: organization.name,
              slug: organization.slug,
            }
          : undefined,
      }
    : undefined

  const impersonationContextValue = {
    isImpersonating,
    impersonatedUser: isImpersonating
      ? {
          id: effectiveUser.id,
          name: effectiveUser.name || 'Unknown User',
          email: effectiveUser.email,
          role: effectiveUser.role,
          organization: organization
            ? {
                name: organization.name,
              }
            : undefined,
        }
      : undefined,
    impersonatorId: impersonationContext.impersonatorId,
  }

  return (
    <ImpersonationProvider value={impersonationContextValue}>
      <UserProvider
        user={navbarUser}
        isImpersonating={isImpersonating}
        currentlyImpersonating={currentlyImpersonating}
      >
        <div className="bg-request-hub-bg min-h-screen flex flex-col">
          {/* Global Impersonation Banner */}
          {isImpersonating && currentlyImpersonating && (
            <ImpersonationBanner
              currentlyImpersonating={currentlyImpersonating}
            />
          )}

          <Navbar
            user={navbarUser}
            isImpersonating={isImpersonating}
            currentlyImpersonating={currentlyImpersonating}
            originalUserRole={originalUserRole}
          />

          <main className="flex-1 pt-6 overflow-hidden">{children}</main>

          {/* Permission Debug Indicator (dev mode only) */}
          <PermissionIndicator
            isImpersonating={isImpersonating}
            effectiveRole={effectiveUser.role}
            originalRole={originalUserRole}
          />
        </div>
      </UserProvider>
    </ImpersonationProvider>
  )
}
