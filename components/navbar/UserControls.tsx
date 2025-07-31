import { ImpersonationSelector } from '@/components/admin'
import { ImpersonationUser, User } from '@/types'
import { Button } from '../ui/button'
import { Icon } from './Icon'
import { UserMenu } from './UserMenu'

interface UserControlsProps {
  user: User
  isImpersonating?: boolean
  currentlyImpersonating?: ImpersonationUser
  originalUserRole?: string
}

export const UserControls = ({
  user,
  isImpersonating = false,
  currentlyImpersonating,
  originalUserRole,
}: UserControlsProps) => {
  const handleMessagesClick = () => {
    console.log('Messages clicked')
    // Add messages logic here
  }

  const handleNotificationsClick = () => {
    console.log('Notifications clicked')
    // Add notifications logic here
  }

  return (
    <div className="flex items-center space-x-2 relative z-50">
      <ImpersonationSelector
        currentUserRole={originalUserRole || user.role}
        isImpersonating={isImpersonating}
        currentlyImpersonating={currentlyImpersonating}
      />

      <Button
        onClick={handleMessagesClick}
        className="text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors cursor-pointer"
        aria-label="Messages"
      >
        <Icon name="message-circle" className="h-5 w-5" />
      </Button>

      <Button
        onClick={handleNotificationsClick}
        className="text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Icon name="bell" className="h-5 w-5" />
      </Button>

      <UserMenu user={user} isImpersonating={isImpersonating} />
    </div>
  )
}
