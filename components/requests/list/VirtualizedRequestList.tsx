'use client'

import { RequestCardSkeleton } from '@/components/ui'
import { RequestWithUser } from '@/types'
import { RequestCard } from '../card/RequestCard'

interface VirtualizedRequestListProps {
  requests: RequestWithUser[]
  isLoading?: boolean
  className?: string
}

export function VirtualizedRequestList({
  requests,
  isLoading = false,
  className = '',
}: VirtualizedRequestListProps) {
  // Deduplicate requests by ID to prevent React key conflicts
  const uniqueRequests = requests.filter(
    (request, index, self) =>
      index === self.findIndex((r) => r.id === request.id)
  )

  if (isLoading) {
    return (
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <RequestCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (uniqueRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No requests found</p>
      </div>
    )
  }

  // Always use consistent 3-column grid with scrollable container
  return (
    <div className={`h-full overflow-y-auto scrollbar-smart ${className}`}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-1 pb-8">
        {uniqueRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  )
}
