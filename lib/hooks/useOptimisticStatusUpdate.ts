import { updateRequestStatus } from '@/lib/utils'
import { RequestStatus } from '@/types'
import { useState } from 'react'

interface UseOptimisticStatusUpdateProps {
  requestId: string
  initialStatus: RequestStatus | string
  onSuccess?: (newStatus: RequestStatus | string) => void
  onError?: (error: Error) => void
}

export function useOptimisticStatusUpdate({
  requestId,
  initialStatus,
  onSuccess,
  onError,
}: UseOptimisticStatusUpdateProps) {
  const [optimisticStatus, setOptimisticStatus] = useState<
    RequestStatus | string
  >(initialStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateStatus = async (newStatus: RequestStatus | string) => {
    if (isUpdating || newStatus === optimisticStatus) return

    // Optimistically update the UI immediately
    setOptimisticStatus(newStatus)
    setIsUpdating(true)
    setError(null)

    try {
      const success = await updateRequestStatus(requestId, newStatus)

      if (success) {
        onSuccess?.(newStatus)
      } else {
        // Revert optimistic update on failure
        setOptimisticStatus(initialStatus)
        const updateError = new Error('Failed to update status')
        setError(updateError)
        onError?.(updateError)
      }
    } catch (err) {
      // Revert optimistic update on error
      setOptimisticStatus(initialStatus)
      const updateError =
        err instanceof Error ? err : new Error('Unknown error')
      setError(updateError)
      onError?.(updateError)
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    status: optimisticStatus,
    isUpdating,
    error,
    updateStatus,
  }
}
