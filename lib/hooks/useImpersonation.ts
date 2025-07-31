import * as impersonationApi from '@/lib/api/impersonation'
import type { ImpersonationState } from '@/types'
import { useEffect, useState } from 'react'

export const useImpersonation = (currentUserRole: string) => {
  const [state, setState] = useState<ImpersonationState>({
    users: [],
    loading: true,
  })

  useEffect(() => {
    if (currentUserRole === 'SUPER_ADMIN') {
      loadUsers()
    } else {
      setState((prev) => ({ ...prev, loading: false }))
    }
  }, [currentUserRole])

  const loadUsers = async () => {
    try {
      const users = await impersonationApi.fetchUsers()
      setState({ users, loading: false })
    } catch (error) {
      setState({
        users: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load users',
      })
    }
  }

  const startImpersonation = async (userId: string) => {
    try {
      await impersonationApi.startImpersonation(userId)
      window.location.reload()
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Failed to start impersonation'
      )
    }
  }

  const stopImpersonation = async () => {
    try {
      await impersonationApi.stopImpersonation()
      window.location.reload()
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Failed to stop impersonation'
      )
    }
  }

  return {
    ...state,
    startImpersonation,
    stopImpersonation,
  }
}
