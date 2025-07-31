import { IconName } from '@/lib/ui/icons'

export function getRoleIcon(role: string): IconName {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'Crown'
    case 'ADMIN':
      return 'Shield'
    default:
      return 'User'
  }
}

export function getRoleIconColor(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'text-yellow-500'
    case 'ADMIN':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}

export function getRoleBadgeColor(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'bg-yellow-100 text-yellow-800'
    case 'ADMIN':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
