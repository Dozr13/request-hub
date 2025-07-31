import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui'
import { getAvatarUrl } from '@/lib/utils'
import type { User } from '@/types'
import { useState } from 'react'

interface UserMenuTriggerProps {
  user: User
  isMenuOpen: boolean
  onToggle: (e: React.MouseEvent) => void
  isImpersonating?: boolean
}

export const UserMenuTrigger = ({
  user,
  isMenuOpen,
  onToggle,
  isImpersonating = false,
}: UserMenuTriggerProps) => {
  const [imageError, setImageError] = useState(false)
  const avatarData = getAvatarUrl(user)

  // Add cache-busting parameter for impersonation
  const imageUrlWithCacheBust = avatarData.url
    ? `${avatarData.url}${avatarData.url.includes('?') ? '&' : '?'}t=${Date.now()}`
    : undefined

  const handleImageError = () => {
    console.log(
      'Avatar image failed to load for user:',
      user.id,
      'URL:',
      avatarData.url
    )
    setImageError(true)
  }

  return (
    <div className="relative">
      <Button
        onClick={onToggle}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${
          isImpersonating
            ? 'ring-2 ring-yellow-400 hover:ring-yellow-300 focus:ring-yellow-400'
            : 'hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
        }`}
        aria-label="User menu"
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
        data-testid="user-menu"
      >
        <Avatar
          className={`h-10 w-10 ${
            isImpersonating
              ? 'border-2 border-yellow-400'
              : 'border-2 border-gray-600'
          }`}
          key={user.id}
        >
          {imageUrlWithCacheBust && !imageError ? (
            <AvatarImage
              src={imageUrlWithCacheBust}
              onError={handleImageError}
              alt={user.name || 'User avatar'}
            />
          ) : null}
          <AvatarFallback
            className={isImpersonating ? 'bg-yellow-100 text-yellow-800' : ''}
          >
            {avatarData.initials}
          </AvatarFallback>
        </Avatar>
      </Button>

      {/* Impersonation indicator badge */}
      {isImpersonating && (
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center">
          <div className="h-2 w-2 bg-yellow-600 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}
