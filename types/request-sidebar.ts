import type { MeetingInfo } from './messages'
import type { RequestDetails } from './request-details'
import type { RequestWithUser } from './user'

export interface RequestSidebarProps {
  request: RequestDetails | RequestWithUser
  meetingInfo: MeetingInfo
}

export interface ActionButtonsProps {
  className?: string
}

export interface MeetingCardProps {
  request: RequestDetails | RequestWithUser
  meetingInfo: MeetingInfo
}

export interface DetailsCardProps {
  request: RequestDetails | RequestWithUser
}

export interface FileDeliverablesCardProps {
  className?: string
}

export interface RequestTextCardProps {
  description: string
}
