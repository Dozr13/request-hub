import type { ImpersonationUser } from '@/types'

export const fetchUsers = async (): Promise<ImpersonationUser[]> => {
  const response = await fetch('/api/admin/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export const startImpersonation = async (userId: string): Promise<void> => {
  const response = await fetch('/api/admin/impersonate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetUserId: userId }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to start impersonation')
  }
}

export const stopImpersonation = async (): Promise<void> => {
  const response = await fetch('/api/admin/impersonate', {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to stop impersonation')
  }
}
