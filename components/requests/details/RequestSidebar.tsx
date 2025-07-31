import type { RequestSidebarProps } from '@/types'
import { DetailsCard } from './sidebar/DetailsCard'
import { FileDeliverablesCard } from './sidebar/FileDeliverablesCard'
import { MeetingCard } from './sidebar/MeetingCard'
import { RequestTextCard } from './sidebar/RequestTextCard'

export const RequestSidebar = ({
  request,
  meetingInfo,
}: RequestSidebarProps) => {
  return (
    <div className="space-y-3">
      <MeetingCard request={request} meetingInfo={meetingInfo} />
      <DetailsCard request={request} />
      <FileDeliverablesCard />
      <RequestTextCard description={request.description} />
    </div>
  )
}
