'use client'

import { useUserMenu } from '@/lib/hooks/useUserMenu'
import type { UserMenuProps } from '@/types'
import { MenuNavigationItems } from './user-menu/MenuNavigationItems'
import { UserInfoSection } from './user-menu/UserInfoSection'
import { UserMenuTrigger } from './user-menu/UserMenuTrigger'

interface ExtendedUserMenuProps extends UserMenuProps {
  isImpersonating?: boolean
}

export const UserMenu = ({
  user,
  isImpersonating = false,
}: ExtendedUserMenuProps) => {
  const { state, actions, currentUser, menuRef } = useUserMenu(user)

  return (
    <div className="relative" ref={menuRef}>
      <UserMenuTrigger
        user={currentUser}
        isMenuOpen={state.isMenuOpen}
        onToggle={actions.toggleMenu}
        isImpersonating={isImpersonating}
      />

      {state.isMenuOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[200]"
          style={{
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          <UserInfoSection
            user={currentUser}
            showAvatarUpload={state.showAvatarUpload}
            onEditAvatarClick={actions.handleEditAvatarClick}
            onAvatarUploadSuccess={actions.handleAvatarUploadSuccess}
          />

          <MenuNavigationItems
            onItemClick={actions.closeMenu}
            onSignOut={actions.handleSignOut}
          />
        </div>
      )}
    </div>
  )
}
