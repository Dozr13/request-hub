import { RequestStatus } from './request'
import { RequestWithUser, UserRole } from './user'

export interface AdminRequestCardProps {
  request: RequestWithUser
  userRole: UserRole
  onStatusUpdate?: (
    requestId: string,
    newStatus: RequestStatus | string
  ) => void
}

export interface StatusOption {
  status: RequestStatus
  label: string
  color: string
}
