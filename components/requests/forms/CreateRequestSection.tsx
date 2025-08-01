'use client'

import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'

interface CreateRequestSectionProps {
  onCreateRequest: () => void
}

export const CreateRequestSection = ({
  onCreateRequest,
}: CreateRequestSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="request-hub-section-header">Create Request</h2>

      <Button
        variant="outline"
        onClick={onCreateRequest}
        className="flex flex-col items-start justify-center p-4 h-auto w-[200px] space-y-2 mb-5.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
        data-testid="new-request-button"
      >
        <div className="flex justify-between items-center w-full">
          <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
            <Icon name="FileText" className="h-4 w-4 text-white" />
          </div>
          <Icon
            name="Plus"
            className="h-4 w-4 text-request-hub-text-secondary self-start"
          />
        </div>
        <span className="text-sm font-medium">New Request</span>
      </Button>
    </div>
  )
}
