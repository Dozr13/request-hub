import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { DropdownMenuItem } from '@/components/ui'
import { Icon } from '@/components/ui'
import { getAvatarUrl } from '@/lib/utils'
import { getRoleBadgeColor, getRoleIcon, getRoleIconColor } from '@/lib/utils'
import type { ImpersonationUser } from '@/types'

interface UserListItemProps {
  user: ImpersonationUser
  onSelect: (userId: string) => void
}

export function UserListItem({ user, onSelect }: UserListItemProps) {
  const roleIconName = getRoleIcon(user.role)
  const roleIconColor = getRoleIconColor(user.role)
  const roleBadgeColor = getRoleBadgeColor(user.role)

  return (
    <DropdownMenuItem
      onClick={() => onSelect(user.id)}
      className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-50"
      data-testid={`impersonate-${user.email}`}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={getAvatarUrl(user).url} />
        <AvatarFallback className="text-xs">
          {getAvatarUrl(user).initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 truncate">
            {user.name || 'Unnamed User'}
          </span>
          <Icon name={roleIconName} className={`h-3 w-3 ${roleIconColor}`} />
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500 truncate">{user.email}</span>
          <span
            className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${roleBadgeColor}`}
          >
            {user.role}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {user.organization?.name || 'No Organization'}
        </span>
      </div>
    </DropdownMenuItem>
  )
}
