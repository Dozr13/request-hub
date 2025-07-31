'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useRef, useState } from 'react'

interface AvatarUploadProps {
  currentImageUrl?: string
  userName: string
  onUploadSuccess: (imageUrl: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export function AvatarUpload({
  currentImageUrl,
  userName,
  onUploadSuccess,
  size = 'md',
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/users/upload-avatar', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()
      onUploadSuccess(result.imageUrl)
    } catch (error) {
      console.error('Error uploading avatar:', error)
      // You could add toast notification here
      alert('Failed to upload avatar. Please try again.')
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          {currentImageUrl && !imageError ? (
            <AvatarImage
              src={currentImageUrl}
              onError={handleImageError}
              alt={userName}
            />
          ) : null}
          <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button
          size="sm"
          variant="outline"
          className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0"
          onClick={handleFileSelect}
        >
          <Icon name="Camera" className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{userName}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFileSelect}
          className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto justify-start"
        >
          Change photo
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
