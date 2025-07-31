'use client'

import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallback?: string
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallback = '/images/placeholder.png',
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    if (imageSrc !== fallback) {
      setImageSrc(fallback)
      setHasError(false)
    } else {
      setHasError(true)
      setIsLoading(false)
    }
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-500',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <LoadingSkeleton
          width={width}
          height={height}
          className={cn('absolute inset-0', className)}
        />
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={width || 0}
        height={height || 0}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        decoding="async"
      />
    </div>
  )
}

// Optimized avatar component
export const OptimizedAvatar = ({
  src,
  alt,
  fallback,
  className,
  size = 40,
}: {
  src?: string
  alt: string
  fallback: string
  className?: string
  size?: number
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-medium',
          className
        )}
        style={{ width: size, height: size }}
      >
        {fallback.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <LoadingSkeleton
          width={size}
          height={size}
          rounded="full"
          className="absolute inset-0"
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(
          'rounded-full transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        priority={false}
        decoding="async"
      />
    </div>
  )
}
