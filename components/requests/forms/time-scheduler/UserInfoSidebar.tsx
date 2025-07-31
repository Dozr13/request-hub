import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { getAvatarUrl } from '@/lib/utils'
import type { UserInfoSidebarProps } from '@/types'

export const UserInfoSidebar = ({
  user,
  selectedService,
}: UserInfoSidebarProps) => {
  return (
    <div className="bg-gray-50 p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={getAvatarUrl(user).url} alt={user.name} />
          <AvatarFallback className="text-sm">
            {getAvatarUrl(user).initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          {user.role && <p className="text-sm text-gray-500">{user.role}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900">Service Request</h4>
          <p className="text-sm text-gray-600">{selectedService}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900">What&apos;s Included</h4>
          <p className="text-sm text-gray-600">
            Consultation on {selectedService.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  )
}
