import { ensureUserExists } from '@/lib/api/user'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getImpersonationContext } from './impersonation'

/**
 * For pages that need impersonation context (admin, request details, etc.)
 */
export async function requireAuthenticatedUser() {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const impersonationContext = await getImpersonationContext()
  if (!impersonationContext) redirect('/')

  return {
    userId,
    effectiveUser: impersonationContext.effectiveUser,
    impersonationContext,
  }
}

/**
 * For pages that need admin/super-admin access
 */
export async function requireAdminUser() {
  const { effectiveUser, impersonationContext } =
    await requireAuthenticatedUser()

  if (!['ADMIN', 'SUPER_ADMIN'].includes(effectiveUser.role)) {
    redirect('/requests')
  }

  return { effectiveUser, impersonationContext }
}

/**
 * For simple pages that just need basic user data (no impersonation)
 */
export async function getAuthenticatedUser() {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/')

  const user = await ensureUserExists(userId, clerkUser)
  return { user, userId }
}
