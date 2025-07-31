'use client'

import type { ImpersonationUser } from '@/types'

interface ImpersonationBannerProps {
  currentlyImpersonating: ImpersonationUser
}

export function ImpersonationBanner({
  currentlyImpersonating,
}: ImpersonationBannerProps) {
  const handleStopImpersonating = async () => {
    try {
      const response = await fetch('/api/admin/impersonate', {
        method: 'DELETE',
      })
      if (response.ok) {
        window.location.reload()
      } else {
        console.error('Failed to stop impersonating')
      }
    } catch (error) {
      console.error('Error stopping impersonation:', error)
    }
  }

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
            <span className="font-semibold text-sm">IMPERSONATING</span>
          </div>
          <span className="text-sm">
            You are viewing as <strong>{currentlyImpersonating.name}</strong> (
            {currentlyImpersonating.email})
          </span>
          {currentlyImpersonating.organization?.name && (
            <span className="text-sm opacity-75">
              from {currentlyImpersonating.organization.name}
            </span>
          )}
        </div>
        <button
          onClick={handleStopImpersonating}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
        >
          Exit Impersonation
        </button>
      </div>
    </div>
  )
}
