import type { FilterType, RequestStatus, StatusCounts } from '@/types'
import { RequestWithUser } from '@/types'

export const filterRequestsByStatus = (
  requests: RequestWithUser[] | undefined,
  filter: FilterType
): RequestWithUser[] => {
  const safeRequests = Array.isArray(requests) ? requests : []

  switch (filter) {
    case 'submitted':
      return safeRequests.filter((request) => request.status === 'SUBMITTED')
    case 'actionRequired':
      return safeRequests.filter(
        (request) => request.status === 'ACTION_REQUIRED'
      )
    case 'inProgress':
      return safeRequests.filter((request) => request.status === 'IN_PROGRESS')
    case 'reviewing':
      return safeRequests.filter((request) => request.status === 'REVIEWING')
    case 'completed':
      return safeRequests.filter((request) => request.status === 'COMPLETED')
    default:
      return safeRequests
  }
}

export const calculateStatusCounts = (
  requests: RequestWithUser[] | undefined
): StatusCounts => {
  // Ensure we have an array, even if requests is something else
  const safeRequests = Array.isArray(requests) ? requests : []

  return {
    all: safeRequests.length,
    submitted: safeRequests.filter((r) => r.status === 'SUBMITTED').length,
    actionRequired: safeRequests.filter((r) => r.status === 'ACTION_REQUIRED')
      .length,
    inProgress: safeRequests.filter((r) => r.status === 'IN_PROGRESS').length,
    reviewing: safeRequests.filter((r) => r.status === 'REVIEWING').length,
    completed: safeRequests.filter((r) => r.status === 'COMPLETED').length,
  }
}

export function getStatusBadgeVariant(
  status: RequestStatus | string
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'SUBMITTED':
      return 'secondary'
    case 'ACTION_REQUIRED':
      return 'destructive'
    case 'IN_PROGRESS':
      return 'default'
    case 'REVIEWING':
      return 'outline'
    case 'COMPLETED':
      return 'default'
    default:
      return 'secondary'
  }
}

export function getProgressBarClasses(
  status: RequestStatus | string,
  step: 1 | 2 | 3 | 4
): string {
  const baseClass = 'flex-1 rounded-full'

  switch (status) {
    case 'SUBMITTED':
      return step === 1
        ? `${baseClass} bg-request-hub-green`
        : `${baseClass} bg-gray-200`
    case 'ACTION_REQUIRED':
      return `${baseClass} bg-progress-red`
    case 'IN_PROGRESS':
      return step <= 2
        ? `${baseClass} bg-request-hub-green`
        : `${baseClass} bg-gray-200`
    case 'REVIEWING':
      return step <= 3
        ? `${baseClass} bg-request-hub-green`
        : `${baseClass} bg-gray-200`
    case 'COMPLETED':
      return step <= 4
        ? `${baseClass} bg-request-hub-green`
        : `${baseClass} bg-gray-200`
    default:
      return `${baseClass} bg-gray-200`
  }
}
