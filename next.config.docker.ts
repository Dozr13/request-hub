import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'],

  // Disable SWC completely to avoid ARM64 compatibility issues
  swcMinify: false,

  // Disable SWC compiler and use Babel instead
  experimental: {
    forceSwcTransforms: false,
  },

  // Use Babel instead of SWC
  compiler: {
    removeConsole: false,
  },

  // Enable standalone output for Docker builds only
  output: 'standalone',

  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL,
  },
}

export default nextConfig
