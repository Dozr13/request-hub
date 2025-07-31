import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { AvatarUpload } from '@/components/ui'
import { Button } from '@/components/ui'
import { getAvatarUrl } from '@/lib/utils'
import type { User } from '@/types'

interface UserInfoSectionProps {
  user: User
  showAvatarUpload: boolean
  onEditAvatarClick: (e: React.MouseEvent) => void
  onAvatarUploadSuccess: (imageUrl: string | null) => void
}

export const UserInfoSection = ({
  user,
  showAvatarUpload,
  onEditAvatarClick,
  onAvatarUploadSuccess,
}: UserInfoSectionProps) => {
  const avatarData = getAvatarUrl(user)

  // Add cache-busting parameter for impersonation
  const imageUrlWithCacheBust = avatarData.url
    ? `${avatarData.url}${avatarData.url.includes('?') ? '&' : '?'}t=${Date.now()}`
    : undefined

  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 relative">
          <Avatar className="h-12 w-12" key={user.id}>
            {imageUrlWithCacheBust && (
              <AvatarImage
                src={imageUrlWithCacheBust}
                alt={user.name || 'User avatar'}
              />
            )}
            <AvatarFallback>{avatarData.initials}</AvatarFallback>
          </Avatar>
          <Button
            onClick={onEditAvatarClick}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            title="Edit avatar"
          >
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {user.name || 'User'}
          </p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
          {user.organization?.name && (
            <p className="text-xs text-gray-400 truncate">
              {user.organization.name} | {user.role}
            </p>
          )}
        </div>
      </div>

      {/* Avatar Upload Section */}
      {showAvatarUpload && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <AvatarUpload
            currentImageUrl={getAvatarUrl(user).url}
            userName={user.name || user.email}
            onUploadSuccess={onAvatarUploadSuccess}
            size="sm"
          />
        </div>
      )}
    </div>
  )
}
