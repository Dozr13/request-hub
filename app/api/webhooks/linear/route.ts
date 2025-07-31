import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import {
  syncLinearTaskStatus,
  verifyLinearWebhook,
} from '@/lib/integrations/linear'
import { triggerRequestUpdate } from '@/lib/integrations/pusher'
import type { RequestStatus } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

interface LinearWebhookPayload {
  action: string
  data: {
    id: string
    identifier: string
    title: string
    state: {
      id: string
      name: string
    }
    url: string
  }
  type: string
  organizationId: string
  webhookTimestamp: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('linear-signature') || ''

    // Verify webhook signature
    if (!verifyLinearWebhook(body, signature)) {
      console.error('Invalid Linear webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload: LinearWebhookPayload = JSON.parse(body)

    // Only handle issue updates
    if (payload.type !== 'Issue' || payload.action !== 'update') {
      return NextResponse.json({ message: 'Event not processed' })
    }

    const linearTaskId = payload.data.id

    // Find the request associated with this Linear task
    const requestRecord = await prisma.request.findFirst({
      where: { linearTaskId },
      include: {
        user: { select: { name: true, email: true, imageUrl: true } },
      },
    })

    if (!requestRecord) {
      console.log(`No request found for Linear task: ${linearTaskId}`)
      return NextResponse.json({ message: 'Request not found' })
    }

    // Sync the task status
    const statusSync = await syncLinearTaskStatus(linearTaskId)

    if (!statusSync.success) {
      console.error('Failed to sync Linear task status:', statusSync.error)
      return NextResponse.json(
        { error: 'Failed to sync status' },
        { status: 500 }
      )
    }

    // Update request status in database
    if (statusSync.status) {
      const updatedRequest = await prisma.request.update({
        where: { id: requestRecord.id },
        data: {
          status: statusSync.status as RequestStatus,
          updatedAt: new Date(),
        },
        include: {
          user: { select: { name: true, email: true, imageUrl: true } },
        },
      })

      console.log(
        `Updated request ${requestRecord.id} status from Linear: ${statusSync.status}`
      )

      // Get organization info from Clerk
      const org = await getClerkOrganization(updatedRequest.clerkOrgId)

      // Trigger real-time update to frontend
      await triggerRequestUpdate(updatedRequest.clerkOrgId, {
        ...updatedRequest,
        businessArea: updatedRequest.businessArea || '',
        serviceType: updatedRequest.serviceType || '',
        organization: org ? { name: org.name } : undefined,
      })

      return NextResponse.json({
        success: true,
        message: 'Request status updated',
        request: updatedRequest,
        linearStatus: statusSync.linearStatus,
      })
    }

    return NextResponse.json({ message: 'No status change detected' })
  } catch (error) {
    console.error('Error processing Linear webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Linear webhook endpoint is active',
    timestamp: new Date().toISOString(),
  })
}
