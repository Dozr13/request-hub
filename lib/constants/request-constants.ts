import type { RequestStatus } from '@/types'

export const REQUEST_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEWING: 'REVIEWING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

export const STATUS_DISPLAY_NAMES: Record<RequestStatus, string> = {
  SUBMITTED: 'New',
  IN_PROGRESS: 'In Progress',
  REVIEWING: 'Reviewing',
  COMPLETED: 'Completed',
  ACTION_REQUIRED: 'Action Required',
}

export const CATEGORY_MAPPING: Record<string, string> = {
  Marketing: 'MARKETING',
  Sales: 'SALES',
  'Operations & Fulfillment': 'OPERATIONS',
  'Finance & Management': 'FINANCE',
  Hiring: 'HIRING',
  Legal: 'LEGAL',
}

export const DEFAULT_USER = {
  id: 'default',
  name: 'HTV User',
  imageUrl: null,
  role: 'Team Member',
}

export const FORM_VALIDATION = {
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  TITLE_REQUIRED: true,
  DESCRIPTION_REQUIRED: true,
}

export const TIME_SLOTS = [
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
]

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const REQUEST_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const
