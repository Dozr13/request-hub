'use client'

import { NAVIGATION_ITEMS, isActiveRoute } from '@/lib/constants'
import { IconName } from '@/lib/ui/icons'
import { UserRole } from '@/types'
import { NavigationItem } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '../ui/icon'

interface NavigationLinksProps {
  userRole?: UserRole
}

export const NavigationLinks = ({
  userRole = 'USER',
}: NavigationLinksProps) => {
  const pathname = usePathname()

  const allowedItems = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  )

  return (
    <div className="hidden md:ml-6 md:flex md:space-x-1">
      {allowedItems.map((item: NavigationItem) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActiveRoute(pathname, item.href)
              ? 'text-white bg-gray-800'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Icon name={item.icon as IconName} className="h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  )
}
