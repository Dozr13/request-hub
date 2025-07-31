/**
 * Impersonation Permission Models
 *
 * STRICT_IMPERSONATION: When impersonating, you only get the impersonated user's permissions
 * ADMIN_OVERRIDE: Original SUPER_ADMIN retains their permissions even when impersonating
 * COMBINED_PERMISSIONS: Combines both original and impersonated user permissions
 */
export type ImpersonationPermissionModel =
  | 'STRICT_IMPERSONATION' // Only impersonated user's permissions
  | 'ADMIN_OVERRIDE' // Original admin permissions + impersonated
  | 'COMBINED_PERMISSIONS' // Union of both users' permissions

// Configuration - easy to change
export const IMPERSONATION_CONFIG = {
  // Current permission model
  permissionModel: 'STRICT_IMPERSONATION' as ImpersonationPermissionModel,

  // Whether to show debug info about permission decisions
  debugPermissions: process.env.NODE_ENV === 'development',

  // Whether original SUPER_ADMIN can bypass org restrictions
  allowCrossOrgAccess: false,
} as const

/**
 * Determines what permissions to use based on impersonation context
 */
export function getEffectivePermissions(context: {
  effectiveUser: { role: string; clerkOrgId: string }
  originalUserRole?: string
  isImpersonating: boolean
}) {
  const { effectiveUser, originalUserRole, isImpersonating } = context

  switch (IMPERSONATION_CONFIG.permissionModel) {
    case 'STRICT_IMPERSONATION':
      // When impersonating, only use the impersonated user's permissions
      return {
        role: effectiveUser.role,
        orgId: effectiveUser.clerkOrgId,
        canAccessAllOrgs: effectiveUser.role === 'SUPER_ADMIN',
        reasoning: isImpersonating
          ? `Using impersonated user's permissions: ${effectiveUser.role}`
          : `Using own permissions: ${effectiveUser.role}`,
      }

    case 'ADMIN_OVERRIDE':
      // Original SUPER_ADMIN retains elevated permissions
      if (originalUserRole === 'SUPER_ADMIN') {
        return {
          role: 'SUPER_ADMIN',
          orgId: effectiveUser.clerkOrgId, // Still scoped to effective user's org context
          canAccessAllOrgs: true,
          reasoning: isImpersonating
            ? `Original SUPER_ADMIN retains admin permissions while impersonating ${effectiveUser.role}`
            : `Using own SUPER_ADMIN permissions`,
        }
      }
      // Fall back to effective user permissions
      return {
        role: effectiveUser.role,
        orgId: effectiveUser.clerkOrgId,
        canAccessAllOrgs: effectiveUser.role === 'SUPER_ADMIN',
        reasoning: `Using effective user's permissions: ${effectiveUser.role}`,
      }

    case 'COMBINED_PERMISSIONS':
      // Use the highest permission level between original and effective user
      const highestRole =
        originalUserRole === 'SUPER_ADMIN' ||
        effectiveUser.role === 'SUPER_ADMIN'
          ? 'SUPER_ADMIN'
          : effectiveUser.role

      return {
        role: highestRole,
        orgId: effectiveUser.clerkOrgId,
        canAccessAllOrgs: highestRole === 'SUPER_ADMIN',
        reasoning: isImpersonating
          ? `Combined permissions: original(${originalUserRole}) + effective(${effectiveUser.role}) = ${highestRole}`
          : `Using own permissions: ${effectiveUser.role}`,
      }

    default:
      throw new Error(
        `Unknown permission model: ${IMPERSONATION_CONFIG.permissionModel}`
      )
  }
}
