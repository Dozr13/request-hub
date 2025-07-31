import type { User } from './user'

export interface UserMenuProps {
  user: User
}

export interface MenuItem {
  href: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

export interface UserMenuState {
  isMenuOpen: boolean
  showAvatarUpload: boolean
}

export interface UserMenuActions {
  toggleMenu: (e: React.MouseEvent) => void
  closeMenu: () => void
  handleEditAvatarClick: (e: React.MouseEvent) => void
  handleSignOut: () => Promise<void>
  handleAvatarUploadSuccess: (imageUrl: string | null) => void
}
