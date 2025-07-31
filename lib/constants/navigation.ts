import { IconName } from '@/lib/ui/icons'
import { UserRole } from '@/types'

// Re-export UserRole for convenience
export type { UserRole } from '@/types'

// Main navigation items with role-based access
export const NAVIGATION_ITEMS: Array<{
  name: string
  href: string
  icon: IconName
  roles: UserRole[]
  description?: string
}> = [
  {
    name: 'Home',
    href: '/home',
    icon: 'Home',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    description: 'Dashboard and overview',
  },
  {
    name: 'Community',
    href: '/community',
    icon: 'Users',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    description: 'Connect with community',
  },
  {
    name: 'Company',
    href: '/company',
    icon: 'Building2',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    description: 'Company information',
  },
  {
    name: 'Resources',
    href: '/resources',
    icon: 'BookOpen',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    description: 'Helpful resources',
  },
  {
    name: 'Requests',
    href: '/requests',
    icon: 'CircleQuestionMark',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    description: 'View and manage your requests',
  },
  {
    name: 'Admin',
    href: '/admin',
    icon: 'ShieldCheck',
    roles: ['ADMIN', 'SUPER_ADMIN'],
    description: 'Admin dashboard',
  },
]

// Helper function to check if route is active
export const isActiveRoute = (pathname: string, href: string): boolean => {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname.startsWith(href)
}

// Helper function to filter navigation items by user role
export const getNavigationItemsForRole = (userRole: UserRole) => {
  return NAVIGATION_ITEMS.filter((item) => item.roles.includes(userRole))
}
