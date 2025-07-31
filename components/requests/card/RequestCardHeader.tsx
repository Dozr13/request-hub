import { Badge, CardHeader } from '@/components/ui'
import { getStatusBadgeVariant, getStatusDisplayName } from '@/lib/utils'
import type { AdminRequestCardProps, RequestStatus } from '@/types'
import { AdminActionsDropdown } from '../../admin/requests/AdminActionsDropdown'

interface RequestCardHeaderProps {
  request: AdminRequestCardProps['request']
  userRole: AdminRequestCardProps['userRole']
  isUpdating: boolean
  onStatusUpdate: (status: RequestStatus) => void
}

export const RequestCardHeader = ({
  request,
  userRole,
  isUpdating,
  onStatusUpdate,
}: RequestCardHeaderProps) => {
  const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN'

  return (
    <CardHeader className="pb-3 px-5 pt-5">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Badge
            variant={getStatusBadgeVariant(request.status)}
            className="text-xs px-2 py-1 mb-2"
          >
            {getStatusDisplayName(request.status)}
          </Badge>

          <h3 className="text-base font-medium text-gray-900 mb-1 leading-tight">
            {request.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
            {request.description}
          </p>
        </div>

        {isAdmin && (
          <AdminActionsDropdown
            request={request}
            isUpdating={isUpdating}
            onStatusUpdate={onStatusUpdate}
          />
        )}
      </div>
    </CardHeader>
  )
}
