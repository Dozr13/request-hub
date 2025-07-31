import type { Request } from '@/types'
import Pusher from 'pusher'
import PusherClient from 'pusher-js'

// Type for request data with user and organization info (matches API responses)
export interface RequestData
  extends Omit<Request, 'category' | 'status' | 'priority'> {
  category: string // Allow string for API compatibility
  status: string // Allow string for API compatibility
  priority: string // Allow string for API compatibility
  user: {
    name: string | null
    email: string
    imageUrl: string | null
  }
  organization?: {
    name: string
  }
}

// Server-side Pusher instance
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})

// Client-side Pusher instance
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    forceTLS: true,
  }
)

// Pusher channel names
export const PUSHER_CHANNELS = {
  REQUEST_UPDATES: (clerkOrgId: string) =>
    `organization-${clerkOrgId}-requests`,
  NOTIFICATIONS: (userId: string) => `user-${userId}-notifications`,
  ORGANIZATION_UPDATES: (clerkOrgId: string) =>
    `organization-${clerkOrgId}-updates`,
} as const

// Pusher event types
export const PUSHER_EVENTS = {
  REQUEST_CREATED: 'request-created',
  REQUEST_UPDATED: 'request-updated',
  REQUEST_STATUS_CHANGED: 'request-status-changed',
  NEW_MESSAGE: 'new-message',
  NOTIFICATION_RECEIVED: 'notification-received',
  USER_JOINED_COMPANY: 'user-joined-company',
} as const

export type PusherEvent = (typeof PUSHER_EVENTS)[keyof typeof PUSHER_EVENTS]

// Helper function to trigger request updates
export const triggerRequestUpdate = async (
  clerkOrgId: string,
  request: RequestData
) => {
  try {
    await pusherServer.trigger(
      PUSHER_CHANNELS.REQUEST_UPDATES(clerkOrgId),
      PUSHER_EVENTS.REQUEST_UPDATED,
      {
        request,
        timestamp: new Date().toISOString(),
      }
    )
    console.log(`Triggered real-time update for organization ${clerkOrgId}`)
  } catch (error) {
    console.error('Error triggering real-time update:', error)
  }
}

// Helper function to trigger new request notifications
export const triggerNewRequest = async (
  clerkOrgId: string,
  request: RequestData
) => {
  try {
    await pusherServer.trigger(
      PUSHER_CHANNELS.REQUEST_UPDATES(clerkOrgId),
      PUSHER_EVENTS.REQUEST_CREATED,
      {
        request,
        timestamp: new Date().toISOString(),
      }
    )
    console.log(
      `Triggered new request notification for organization ${clerkOrgId}`
    )
  } catch (error) {
    console.error('Error triggering new request notification:', error)
  }
}

// Helper function to trigger message notifications
export const triggerMessageCreated = async (message: {
  id: string
  content: string
  requestId: string
  companyId: string
  createdAt: Date
  user?: {
    name: string | null
    email: string
    imageUrl: string | null
  }
}) => {
  try {
    await pusherServer.trigger(
      PUSHER_CHANNELS.REQUEST_UPDATES(message.companyId),
      PUSHER_EVENTS.NEW_MESSAGE,
      {
        message,
        timestamp: new Date().toISOString(),
      }
    )
    console.log(
      `Triggered message notification for company ${message.companyId}`
    )
  } catch (error) {
    console.error('Error triggering message notification:', error)
  }
}
