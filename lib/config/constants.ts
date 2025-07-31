/**
 * Application constants and configuration
 */

// Routes
export const ROUTES = {
  HOME: '/',
  LANDING: '/',
  DASHBOARD: '/home',
  REQUESTS: '/requests',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  COMMUNITY: '/community',
  COMPANY: '/company',
  RESOURCES: '/resources',
  ADMIN: '/admin',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const

// API Routes
export const API_ROUTES = {
  REQUESTS: '/api/requests',
  USERS: '/api/users',
  HEALTH: '/api/health',
  SETUP: '/api/setup',
  ADMIN: {
    ELEVATE: '/api/admin/elevate',
    IMPERSONATE: '/api/admin/impersonate',
    USERS: '/api/admin/users',
  },
  WEBHOOKS: {
    LINEAR: '/api/webhooks/linear',
  },
} as const

// Request Status Options
export const REQUEST_STATUS = {
  SUBMITTED: 'SUBMITTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

export const REQUEST_STATUS_LABELS = {
  [REQUEST_STATUS.SUBMITTED]: 'Submitted',
  [REQUEST_STATUS.IN_PROGRESS]: 'In Progress',
  [REQUEST_STATUS.COMPLETED]: 'Completed',
  [REQUEST_STATUS.CANCELLED]: 'Cancelled',
} as const

// Request Priority Options
export const REQUEST_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const

export const REQUEST_PRIORITY_LABELS = {
  [REQUEST_PRIORITY.LOW]: 'Low',
  [REQUEST_PRIORITY.MEDIUM]: 'Medium',
  [REQUEST_PRIORITY.HIGH]: 'High',
  [REQUEST_PRIORITY.URGENT]: 'Urgent',
} as const

// User Roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const

export const USER_ROLE_LABELS = {
  [USER_ROLES.USER]: 'User',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
} as const

// Filter Types
export const FILTER_TYPES = {
  ALL: 'all',
  SUBMITTED: 'submitted',
  IN_PROGRESS: 'inProgress',
  ACTION_REQUIRED: 'actionRequired',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

// Re-export navigation and time constants from centralized constants
export { NAVIGATION_ITEMS } from '@/lib/constants/navigation'
export { TIME_SLOTS } from '@/lib/constants/request-constants'

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const

// Animation Durations (in ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  MAX_FILES: 5,
} as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  WITH_TIME: 'MMM d, yyyy h:mm a',
  TIME_ONLY: 'h:mm a',
  ISO: 'yyyy-MM-dd',
} as const

// Application Limits
export const LIMITS = {
  REQUEST_TITLE_MAX: 100,
  REQUEST_DESCRIPTION_MAX: 1000,
  USER_NAME_MAX: 50,
  COMPANY_NAME_MAX: 100,
  REQUESTS_PER_PAGE: 20,
  SEARCH_MIN_CHARS: 2,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
  RATE_LIMITED: 'Too many requests. Please wait and try again',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  REQUEST_CREATED: 'Request created successfully',
  REQUEST_UPDATED: 'Request updated successfully',
  REQUEST_DELETED: 'Request deleted successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
} as const
