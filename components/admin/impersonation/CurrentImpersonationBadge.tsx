import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import type { ImpersonationUser } from '@/types'

interface CurrentImpersonationBadgeProps {
  user: ImpersonationUser
  onStop: () => void
}

export function CurrentImpersonationBadge({
  user,
  onStop,
}: CurrentImpersonationBadgeProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 rounded-lg"
        data-testid="impersonation-banner"
      >
        <Icon name="Users" className="h-4 w-4 text-yellow-600" />
        <span className="text-sm font-medium text-yellow-800">
          As {user.name}
        </span>
      </div>
      <Button
        onClick={onStop}
        variant="outline"
        size="sm"
        className="text-xs"
        data-testid="stop-impersonation"
      >
        Stop
      </Button>
    </div>
  )
}
