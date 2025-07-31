'use client'

import { Button, Icon } from '@/components/ui'
import { RequestStatus, UserRole } from '@/types'
import { useState } from 'react'
import { ActionButtons } from './sidebar/ActionButtons'
import { DemoControls } from './sidebar/DemoControls'

interface RequestStatusControlsProps {
  requestId: string
  currentStatus: RequestStatus
  userRole: UserRole
  onStatusUpdateStart?: () => void
  onStatusUpdateEnd?: () => void
}

export const RequestStatusControls = ({
  requestId,
  currentStatus,
  userRole,
  onStatusUpdateStart,
  onStatusUpdateEnd,
}: RequestStatusControlsProps) => {
  const [showDemoMode, setShowDemoMode] = useState(false)
  const isUser = userRole === 'USER'
  const isSuperAdmin = userRole === 'SUPER_ADMIN'

  // Hide entire component for regular users
  if (isUser) {
    return null
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="Zap" className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Request Management
              </h3>
              <p className="text-xs text-gray-600">
                Track progress and manage request status
              </p>
            </div>
          </div>

          {/* Demo Mode Toggle - Only for SUPER_ADMIN */}
          {isSuperAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDemoMode(!showDemoMode)}
              className="text-xs border-gray-300 hover:bg-gray-50"
            >
              <Icon
                name={showDemoMode ? 'CheckCircle' : 'Sparkles'}
                className="h-3 w-3 mr-1"
              />
              {showDemoMode ? 'Show Status' : 'Show Demo'}
            </Button>
          )}
        </div>
      </div>

      {/* Compact Content */}
      <div className="p-4 space-y-4">
        {/* Production Mode - Show Status Progression */}
        {!showDemoMode && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Zap" className="w-3 h-3 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">
                Status Progression
              </h4>
            </div>

            <ActionButtons
              requestId={requestId}
              currentStatus={currentStatus}
              className="bg-gray-50 rounded-lg p-3"
              onStatusUpdateStart={onStatusUpdateStart}
              onStatusUpdateEnd={onStatusUpdateEnd}
            />
          </div>
        )}

        {/* Demo Mode - Show Demo Controls */}
        {showDemoMode && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                <Icon name="Sparkles" className="w-3 h-3 text-purple-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">
                Demo Controls
              </h4>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <DemoControls
                requestId={requestId}
                currentStatus={currentStatus}
                onStatusUpdateStart={onStatusUpdateStart}
                onStatusUpdateEnd={onStatusUpdateEnd}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
