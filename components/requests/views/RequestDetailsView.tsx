'use client'

import { useRequest } from '@/lib/hooks'
import { generateMeetingInfo, generateMockMessages } from '@/lib/utils'
import type { RequestDetails, RequestWithUser } from '@/types'
import { RequestStatus, UserRole } from '@/types'
import { useState } from 'react'
import {
  RequestDetailsHeader,
  RequestMainContent,
  RequestSidebar,
  RequestStatusControls,
} from '../details'
import { RequestProgressBar } from '../shared'

interface RequestDetailsViewProps {
  requestId: string
  initialRequest?: RequestDetails | RequestWithUser
  userRole: UserRole
  clerkOrgId: string
}

export const RequestDetailsView = ({
  requestId,
  initialRequest,
  userRole,
  clerkOrgId,
}: RequestDetailsViewProps) => {
  const { data: request, error } = useRequest(requestId)
  const [isStatusUpdating, setIsStatusUpdating] = useState(false)

  // Use React Query data (which updates in real-time) over initial server data
  const displayRequest = request || initialRequest

  if (error || !displayRequest) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-red-600">
            Failed to load request details. Please try again.
          </p>
        </div>
      </div>
    )
  }

  const messages = generateMockMessages(displayRequest)
  const meetingInfo = generateMeetingInfo(displayRequest)

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-4">
        <RequestDetailsHeader
          request={displayRequest}
          isStatusUpdating={isStatusUpdating}
          clerkOrgId={clerkOrgId}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <RequestProgressBar
            status={displayRequest.status}
            showAnimation={!isStatusUpdating}
          />
          <RequestMainContent
            messages={messages}
            participantNames={`${displayRequest.user.name}, David Kim`}
          />
          <RequestStatusControls
            requestId={requestId}
            currentStatus={displayRequest.status as RequestStatus}
            userRole={userRole}
            onStatusUpdateStart={() => setIsStatusUpdating(true)}
            onStatusUpdateEnd={() => setIsStatusUpdating(false)}
          />
        </div>

        <RequestSidebar request={displayRequest} meetingInfo={meetingInfo} />
      </div>
    </div>
  )
}
