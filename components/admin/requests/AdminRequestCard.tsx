'use client'

import { Card } from '@/components/ui'
import { useOptimisticStatusUpdate } from '@/lib/hooks/useOptimisticStatusUpdate'
import type { AdminRequestCardProps } from '@/types'
import { useRouter } from 'next/navigation'
import { RequestCardContent } from '../../requests/card/RequestCardContent'
import { RequestCardFooter } from '../../requests/card/RequestCardFooter'
import { RequestCardHeader } from '../../requests/card/RequestCardHeader'
import { RequestCardProgressBar } from '../../requests/card/RequestCardProgressBar'

export function AdminRequestCard({
  request,
  userRole,
  onStatusUpdate,
}: AdminRequestCardProps) {
  const router = useRouter()

  const {
    status: optimisticStatus,
    isUpdating,
    updateStatus,
  } = useOptimisticStatusUpdate({
    requestId: request.id,
    initialStatus: request.status,
    onSuccess: (newStatus) => {
      onStatusUpdate?.(request.id, newStatus)
    },
    onError: (error) => {
      console.error('Status update failed:', error)
    },
  })

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the dropdown
    if ((e.target as HTMLElement).closest('[role="button"]')) {
      return
    }
    router.push(`/requests/${request.id}`)
  }

  // Use optimistic status for display
  const displayRequest = {
    ...request,
    status: optimisticStatus,
  }

  return (
    <Card
      className="htv-card cursor-pointer transform !shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:!shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col h-full min-h-[280px]"
      onClick={handleCardClick}
    >
      <RequestCardProgressBar status={displayRequest.status} />
      <RequestCardHeader
        request={displayRequest}
        userRole={userRole}
        isUpdating={isUpdating}
        onStatusUpdate={updateStatus}
      />
      <RequestCardContent request={displayRequest} userRole={userRole} />
      <RequestCardFooter request={displayRequest} />
    </Card>
  )
}
