'use client'

import { ImpersonationUser, User } from '@/types'
import { Logo } from './Logo'
import { NavigationLinks } from './NavigationLinks'
import { UserControls } from './UserControls'

interface NavbarProps {
  user: User
  isImpersonating?: boolean
  currentlyImpersonating?: ImpersonationUser
  originalUserRole?: string
}

export const Navbar = ({
  user,
  isImpersonating = false,
  currentlyImpersonating,
  originalUserRole,
}: NavbarProps) => {
  return (
    <div className="bg-htv-dark shadow-sm relative z-40">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3 w-auto">
            <Logo />
            <NavigationLinks userRole={user.role} />
          </div>

          <UserControls
            user={user}
            isImpersonating={isImpersonating}
            currentlyImpersonating={currentlyImpersonating}
            originalUserRole={originalUserRole}
          />
        </div>
      </div>
    </div>
  )
}
