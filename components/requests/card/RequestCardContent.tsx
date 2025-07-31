import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { CardContent } from '@/components/ui'
import { Icon } from '@/components/ui'
import type { RequestWithUser, UserRole } from '@/types'
import Image from 'next/image'

interface RequestCardContentProps {
  request: RequestWithUser
  userRole: UserRole
}

export const RequestCardContent = ({
  request,
  userRole,
}: RequestCardContentProps) => {
  return (
    <CardContent className="px-5 pb-5 flex-1 flex flex-col justify-between">
      <div className="space-y-3 flex-1">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={request.user.imageUrl || undefined}
              alt={request.user.name || 'User'}
            />
            <AvatarFallback className="text-xs">
              {request.user.name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || '?'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 font-medium">
            {request.user.name || 'Unknown User'}
          </span>
          {userRole === 'SUPER_ADMIN' && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Icon name="Building2" className="h-3 w-3" />
              <span>{request.organization?.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 relative">
            <Image
              src="/images/folder-green.png"
              alt="Category"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600 capitalize">
            {request.category.toLowerCase().replace('_', ' ')}
          </span>
        </div>

        {request.assignedTo && (
          <div className="flex items-center space-x-2">
            <Icon name="User" className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Assigned to {request.assignedTo.name}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Icon name="Clock" className="h-3 w-3" />
          <span>
            {new Date(request.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          {request.completedAt && (
            <span>
              • Completed{' '}
              {new Date(request.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </CardContent>
  )
}
