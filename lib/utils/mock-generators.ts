import type {
  MeetingInfo,
  Message,
  RequestDetails,
  RequestWithUser,
} from '@/types'
import { getAvatarUrl } from './avatar-utils'

/**
 * Generates mock chat messages for a request to simulate conversation history
 */
export function generateMockMessages(
  request: RequestDetails | RequestWithUser
): Message[] {
  return [
    {
      id: '1',
      sender: {
        name: request.user.name || 'User',
        role: 'Client',
        avatar: getAvatarUrl(request.user).url || '',
      },
      content: `Hi David, I'm looking for help with our ${request.category.replace('_', ' ').toLowerCase()} needs. ${request.description}`,
      timestamp: new Date(request.createdAt),
    },
    {
      id: '2',
      sender: {
        name: 'David Kim',
        role: 'Expert',
        avatar:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      },
      content: `Hi ${request.user.name?.split(' ')[0] || 'there'}! I'd be happy to help with your ${request.category.replace('_', ' ').toLowerCase()} project. Let me review the details and get back to you with some initial thoughts.`,
      timestamp: new Date(
        new Date(request.createdAt).getTime() + 5 * 60 * 1000
      ), // 5 minutes later
    },
    {
      id: '3',
      sender: {
        name: request.user.name || 'User',
        role: 'Client',
        avatar: getAvatarUrl(request.user).url || '',
      },
      content: `Thanks! I'm particularly interested in getting started as soon as possible. What would be the next steps?`,
      timestamp: new Date(
        new Date(request.createdAt).getTime() + 15 * 60 * 1000
      ), // 15 minutes later
    },
    {
      id: '4',
      sender: {
        name: 'David Kim',
        role: 'Expert',
        avatar:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      },
      content: `Perfect! I've scheduled a consultation call for us to discuss your requirements in detail. You can find the meeting details in the sidebar. Looking forward to working with you!`,
      timestamp: new Date(
        new Date(request.createdAt).getTime() + 30 * 60 * 1000
      ), // 30 minutes later
    },
  ]
}

/**
 * Generates mock meeting information for a request
 */
export function generateMeetingInfo(
  request: RequestDetails | RequestWithUser
): MeetingInfo {
  return {
    title: `Meeting via Google Meet with David K.`,
    date:
      new Date(
        new Date(request.createdAt).getTime() + 24 * 60 * 60 * 1000
      ).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
      }) + ' - 10:30 (CEST)',
    reminder: '2D',
  }
}
