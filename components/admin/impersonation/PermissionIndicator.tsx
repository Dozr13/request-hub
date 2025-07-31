'use client'

import { Badge } from '@/components/ui'
import { IMPERSONATION_CONFIG } from '@/lib/config/impersonation'

interface PermissionIndicatorProps {
  isImpersonating?: boolean
  effectiveRole?: string
  originalRole?: string
}

export function PermissionIndicator({
  isImpersonating = false,
  effectiveRole = 'USER',
  originalRole,
}: PermissionIndicatorProps) {
  // Only show in development mode
  if (!IMPERSONATION_CONFIG.debugPermissions) {
    return null
  }

  const getIndicatorInfo = () => {
    switch (IMPERSONATION_CONFIG.permissionModel) {
      case 'STRICT_IMPERSONATION':
        return {
          label: 'Strict Impersonation',
          description: isImpersonating
            ? `Using only impersonated user's permissions (${effectiveRole})`
            : `Using own permissions (${effectiveRole})`,
          color: 'bg-blue-100 text-blue-800',
        }

      case 'ADMIN_OVERRIDE':
        return {
          label: 'Admin Override',
          description:
            isImpersonating && originalRole === 'SUPER_ADMIN'
              ? `Original SUPER_ADMIN retains elevated permissions`
              : `Using effective user's permissions (${effectiveRole})`,
          color: 'bg-purple-100 text-purple-800',
        }

      case 'COMBINED_PERMISSIONS':
        const highestRole =
          originalRole === 'SUPER_ADMIN' || effectiveRole === 'SUPER_ADMIN'
            ? 'SUPER_ADMIN'
            : effectiveRole
        return {
          label: 'Combined Permissions',
          description: isImpersonating
            ? `Combined: ${originalRole} + ${effectiveRole} = ${highestRole}`
            : `Using own permissions (${effectiveRole})`,
          color: 'bg-green-100 text-green-800',
        }

      default:
        return {
          label: 'Unknown',
          description: 'Unknown permission model',
          color: 'bg-gray-100 text-gray-800',
        }
    }
  }

  const { label, description, color } = getIndicatorInfo()

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Badge className={`${color} text-xs font-medium`}>{label}</Badge>
          {isImpersonating && (
            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
              IMPERSONATING
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-600">{description}</p>
        <div className="text-xs text-gray-400 mt-1">
          Dev Mode - Permission Debug Info
        </div>
      </div>
    </div>
  )
}
