'use client'

import { Button, Icon } from '@/components/ui'
import { STATUS_PROGRESSION } from '@/lib/constants/status-progression'
import { useUpdateRequestStatus } from '@/lib/hooks/useRequestsWithCache'
import { cn } from '@/lib/utils'
import { RequestStatus } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'

interface StatusProgressionProps {
  requestId: string
  currentStatus: RequestStatus
  className?: string
  onStatusUpdateStart?: () => void
  onStatusUpdateEnd?: () => void
}

export const ActionButtons = ({
  requestId,
  currentStatus,
  className,
  onStatusUpdateStart,
  onStatusUpdateEnd,
}: StatusProgressionProps) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const updateStatusMutation = useUpdateRequestStatus()

  const getNextStatus = (current: RequestStatus): RequestStatus | null => {
    const currentIndex = STATUS_PROGRESSION.findIndex(
      (s) => s.status === current
    )
    if (currentIndex === -1 || currentIndex === STATUS_PROGRESSION.length - 1) {
      return null
    }
    return STATUS_PROGRESSION[currentIndex + 1].status
  }

  const getCurrentStep = () => {
    return STATUS_PROGRESSION.findIndex((s) => s.status === currentStatus)
  }

  const handleStatusUpdate = async () => {
    const nextStatus = getNextStatus(currentStatus)
    if (!nextStatus) return

    setIsUpdating(true)
    onStatusUpdateStart?.()
    try {
      await updateStatusMutation.mutateAsync({
        requestId,
        status: nextStatus,
      })

      toast.success(`Request moved to ${nextStatus.replace('_', ' ')}`)
    } catch (error) {
      toast.error('Failed to update request status')
      console.error('Status update failed:', error)
    } finally {
      setIsUpdating(false)
      onStatusUpdateEnd?.()
    }
  }

  const nextStatus = getNextStatus(currentStatus)
  const currentStep = getCurrentStep()
  const isCompleted = currentStatus === 'COMPLETED'

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Request Status
          </h3>
        </div>

        <div className="space-y-2">
          {STATUS_PROGRESSION.map((step, index) => {
            const isActive = step.status === currentStatus
            const isCompleted = index < currentStep
            const isUpdatingToThis =
              isUpdating && step.status === getNextStatus(currentStatus)

            return (
              <div key={step.status} className="flex items-center space-x-2">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium relative',
                    isCompleted && 'bg-green-500 text-white',
                    isActive && 'bg-blue-500 text-white',
                    !isCompleted && !isActive && 'bg-gray-100 text-gray-400'
                  )}
                >
                  {isUpdatingToThis ? (
                    <Icon name="Loader2" className="w-3 h-3 animate-spin" />
                  ) : isCompleted ? (
                    <Icon name="Check" className="w-3 h-3" />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      'text-xs font-medium',
                      isCompleted && 'text-green-700',
                      isActive && 'text-blue-700',
                      !isCompleted && !isActive && 'text-gray-500',
                      isUpdatingToThis && 'text-blue-600'
                    )}
                  >
                    {step.status.replace('_', ' ')}
                    {isUpdatingToThis && (
                      <span className="ml-1 text-blue-500">(updating...)</span>
                    )}
                  </div>
                  {isActive && (
                    <div className="text-xs text-gray-500">Current status</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!isCompleted && nextStatus && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-3">
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">
              Next Action
            </h4>
            <p className="text-xs text-gray-600">
              {
                STATUS_PROGRESSION.find((s) => s.status === currentStatus)
                  ?.description
              }
            </p>
          </div>

          <Button
            onClick={handleStatusUpdate}
            disabled={isUpdating}
            className={cn(
              'w-full h-8 flex items-center justify-center gap-2 text-white font-medium text-xs',
              STATUS_PROGRESSION.find((s) => s.status === currentStatus)
                ?.color || 'bg-blue-600 hover:bg-blue-700'
            )}
          >
            {isUpdating ? (
              <>
                <Icon name="Loader2" className="w-3 h-3 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Icon
                  name={
                    STATUS_PROGRESSION.find((s) => s.status === currentStatus)
                      ?.icon || 'Play'
                  }
                  className="w-3 h-3"
                />
                {
                  STATUS_PROGRESSION.find((s) => s.status === currentStatus)
                    ?.label
                }
              </>
            )}
          </Button>
        </div>
      )}

      {isCompleted && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-green-800">
                Request Completed
              </div>
              <div className="text-xs text-green-600">
                All work has been finished successfully
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
