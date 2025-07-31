import { prisma } from '@/lib/database'
import { HealthCheckResponse } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  const healthCheck: HealthCheckResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'up',
      clerk: 'up',
      pusher: 'up',
    },
  }

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    healthCheck.services.database = 'up'
  } catch (error) {
    console.error('  Database health check failed:', error)
    healthCheck.services.database = 'down'
    healthCheck.status = 'unhealthy'
  }

  // TODO: Add actual checks for Clerk and Pusher if needed
  // For now, we assume they're up since auth middleware would fail if Clerk was down

  const statusCode = healthCheck.status === 'healthy' ? 200 : 503

  return NextResponse.json(healthCheck, { status: statusCode })
}
