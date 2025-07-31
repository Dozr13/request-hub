/**
 * Centralized environment configuration
 * This file validates and exports all environment variables used in the application
 */

// Database
export const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

// Clerk Authentication
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY
export const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
export const NEXT_PUBLIC_CLERK_SIGN_IN_URL =
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in'
export const NEXT_PUBLIC_CLERK_SIGN_UP_URL =
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up'

if (!CLERK_SECRET_KEY || !NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Clerk environment variables are required')
}

// Linear Integration
export const LINEAR_API_KEY = process.env.LINEAR_API_KEY
export const LINEAR_WEBHOOK_SECRET = process.env.LINEAR_WEBHOOK_SECRET

// Pusher Real-time
export const PUSHER_APP_ID = process.env.PUSHER_APP_ID
export const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY // Use the same key as public
export const PUSHER_SECRET = process.env.PUSHER_SECRET
export const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER || 'us2'
export const NEXT_PUBLIC_PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY
export const NEXT_PUBLIC_PUSHER_CLUSTER =
  process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2'

// Application Settings
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (NODE_ENV === 'production'
    ? 'https://htv-mock-test.vercel.app'
    : 'http://localhost:3000')

// Feature Flags
export const ENABLE_LINEAR_INTEGRATION =
  process.env.ENABLE_LINEAR_INTEGRATION === 'true'
export const ENABLE_PUSHER_REALTIME =
  process.env.ENABLE_PUSHER_REALTIME === 'true'
export const ENABLE_DEBUG_LOGGING =
  process.env.ENABLE_DEBUG_LOGGING === 'true' || NODE_ENV === 'development'

// API Configuration
export const API_RATE_LIMIT = parseInt(process.env.API_RATE_LIMIT || '100', 10)
export const API_RATE_WINDOW_MS = parseInt(
  process.env.API_RATE_WINDOW_MS || '900000',
  10
) // 15 minutes

// File Upload
export const MAX_FILE_SIZE = parseInt(
  process.env.MAX_FILE_SIZE || '10485760',
  10
) // 10MB
export const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES?.split(
  ','
) || [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Environment validation helper
export function validateEnvironment() {
  const requiredVars = [
    'DATABASE_URL',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  ]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    )
  }

  console.log(' Environment configuration validated')
}

// Export configuration object for easier access
export const config = {
  database: {
    url: DATABASE_URL,
  },
  clerk: {
    secretKey: CLERK_SECRET_KEY,
    publishableKey: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    signInUrl: NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    signUpUrl: NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  },
  linear: {
    apiKey: LINEAR_API_KEY,
    webhookSecret: LINEAR_WEBHOOK_SECRET,
    enabled: ENABLE_LINEAR_INTEGRATION,
  },
  pusher: {
    appId: PUSHER_APP_ID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUSHER_CLUSTER,
    publicKey: NEXT_PUBLIC_PUSHER_KEY,
    publicCluster: NEXT_PUBLIC_PUSHER_CLUSTER,
    enabled: ENABLE_PUSHER_REALTIME,
  },
  app: {
    env: NODE_ENV,
    url: NEXT_PUBLIC_APP_URL,
    debugLogging: ENABLE_DEBUG_LOGGING,
  },
  api: {
    rateLimit: API_RATE_LIMIT,
    rateLimitWindow: API_RATE_WINDOW_MS,
  },
  upload: {
    maxFileSize: MAX_FILE_SIZE,
    allowedTypes: ALLOWED_FILE_TYPES,
  },
} as const
