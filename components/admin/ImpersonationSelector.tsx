'use client'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
} from '@/components/ui'
import { useImpersonation } from '@/lib/hooks/useImpersonation'
import type { ImpersonationSelectorProps } from '@/types'
import { UserListItem } from './impersonation/UserListItem'

export function ImpersonationSelector({
  currentUserRole,
  isImpersonating = false,
}: ImpersonationSelectorProps) {
  const { users, loading, startImpersonation } =
    useImpersonation(currentUserRole)

  // Only show for SUPER_ADMIN users when NOT impersonating
  if (currentUserRole !== 'SUPER_ADMIN' || isImpersonating) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs border-gray-200 bg-blue-600 hover:bg-blue-700 text-white"
          data-testid="organization-selector"
        >
          <Icon name="Users" className="h-4 w-4" />
          Impersonate
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg"
        align="end"
      >
        <DropdownMenuLabel>Impersonate User</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading users...</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {users.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onSelect={startImpersonation}
              />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
