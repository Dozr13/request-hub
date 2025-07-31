import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from '@/components/ui'
import { Button } from '@/components/ui'
import { STATUS_OPTIONS } from '@/lib/constants'
import type { RequestStatus, RequestWithUser } from '@/types'

interface AdminActionsDropdownProps {
  request: RequestWithUser
  isUpdating: boolean
  onStatusUpdate: (status: RequestStatus) => void
}

export function AdminActionsDropdown({
  request,
  isUpdating,
  onStatusUpdate,
}: AdminActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 ml-2"
          disabled={isUpdating}
        >
          <Icon name="MoreHorizontal" className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.status}
            onClick={(e) => {
              e.stopPropagation()
              onStatusUpdate(option.status)
            }}
            disabled={request.status === option.status || isUpdating}
            className="text-sm"
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 ${option.color.split(' ')[0]}`}
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
