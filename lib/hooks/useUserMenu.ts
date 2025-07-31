import type { User } from '@/types'
import type { UserMenuActions, UserMenuState } from '@/types'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useUserMenu = (initialUser: User) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAvatarUpload, setShowAvatarUpload] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>(initialUser)
  const menuRef = useRef<HTMLDivElement>(null)
  const { signOut } = useClerk()
  const router = useRouter()

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setShowAvatarUpload(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setShowAvatarUpload(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
    setShowAvatarUpload(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setShowAvatarUpload(false)
  }

  const handleSignOut = async () => {
    closeMenu()
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign Out error:', error)
      window.location.href = '/sign-in'
    }
  }

  const handleAvatarUploadSuccess = (imageUrl: string | null) => {
    setCurrentUser({
      ...currentUser,
      imageUrl,
    })
    setShowAvatarUpload(false)
  }

  const handleEditAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowAvatarUpload(!showAvatarUpload)
  }

  const state: UserMenuState = {
    isMenuOpen,
    showAvatarUpload,
  }

  const actions: UserMenuActions = {
    toggleMenu,
    closeMenu,
    handleEditAvatarClick,
    handleSignOut,
    handleAvatarUploadSuccess,
  }

  return {
    state,
    actions,
    currentUser,
    menuRef,
  }
}
