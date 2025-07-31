'use client'

import { cn } from '@/lib/utils'
import { RequestStatus } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../../../ui/button'
import { Icon } from '../../../ui/icon'

interface DemoControlsProps {
  requestId: string
  currentStatus: RequestStatus
  onStatusUpdateStart?: () => void
  onStatusUpdateEnd?: () => void
}

export const DemoControls = ({
  requestId,
  currentStatus,
  onStatusUpdateStart,
  onStatusUpdateEnd,
}: DemoControlsProps) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus: RequestStatus) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)
    onStatusUpdateStart?.()
    try {
      const response = await fetch('/api/demo/status-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          newStatus,
        }),
      })

      if (response.ok) {
        toast.success(`Status updated to ${newStatus.replace('_', ' ')}`)
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Demo update error:', error)
      toast.error('Failed to update status')
    } finally {
      setIsUpdating(false)
      onStatusUpdateEnd?.()
    }
  }

  return (
    <div>
      {/* <div className="flex items-center gap-2 mb-2">
        <Icon name="Zap" className="w-3 h-3 text-gray-600" />
        <h3 className="text-xs font-medium text-gray-900">Quick Status Test</h3>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {STATUS_OPTIONS.map((option) => {
          const isCurrentStatus = option.status === currentStatus
          const isUpdatingThis = isUpdating && option.status !== currentStatus

          return (
            <Button
              key={option.status}
              onClick={() => handleStatusUpdate(option.status)}
              disabled={isUpdating || isCurrentStatus}
              variant="outline"
              size="sm"
              className={cn(
                'h-6 text-xs justify-start px-2 relative',
                isCurrentStatus
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'hover:bg-gray-100',
                isUpdatingThis && 'opacity-50'
              )}
            >
              {isUpdatingThis && (
                <Icon
                  name="Loader2"
                  className="w-2 h-2 animate-spin absolute left-1"
                />
              )}
              <div
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${option.color}`}
              />
              {option.label}
              {isCurrentStatus && (
                <Icon name="Check" className="w-2 h-2 text-blue-600 ml-auto" />
              )}
            </Button>
          )
        })}
      </div> */}

      <div className="mt-3 pt-2 border-t border-gray-200">
        <Button
          onClick={() => handleStatusUpdate('SUBMITTED')}
          disabled={isUpdating || currentStatus === 'SUBMITTED'}
          variant="outline"
          size="sm"
          className={cn(
            'w-full h-7 text-xs justify-center',
            currentStatus === 'SUBMITTED'
              ? 'bg-gray-50 border-gray-200 text-gray-500'
              : 'hover:bg-red-50 border-red-200 text-red-600 hover:border-red-300'
          )}
        >
          {isUpdating && currentStatus !== 'SUBMITTED' ? (
            <>
              <Icon name="Loader2" className="w-3 h-3 animate-spin mr-1" />
              Resetting...
            </>
          ) : (
            <>
              <Icon name="RefreshCw" className="w-3 h-3 mr-1" />
              Reset to Submitted
            </>
          )}
        </Button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Test real-time updates across multiple tabs or devices
      </div>
    </div>
  )
}
