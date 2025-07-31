import { getClerkOrganization } from '@/lib/auth/clerk-org'
import { prisma } from '@/lib/database'
import {
  triggerRequestUpdate,
  updateLinearTaskStatus,
} from '@/lib/integrations'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { requestId, newStatus } = await request.json()

    if (!requestId || !newStatus) {
      return NextResponse.json(
        { error: 'Missing requestId or newStatus' },
        { status: 400 }
      )
    }

    // Update the request status
    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: { status: newStatus },
      include: {
        user: { select: { name: true, email: true, imageUrl: true } },
      },
    })

    // Update Linear task status if Linear task exists
    if (updatedRequest.linearTaskId) {
      try {
        const linearUpdate = await updateLinearTaskStatus(
          updatedRequest.linearTaskId,
          newStatus
        )

        if (linearUpdate.success) {
          console.log(
            `Demo: Linear task ${updatedRequest.linearTaskId} status updated to: ${newStatus}`
          )
        } else {
          console.warn(
            `Demo: Failed to update Linear task status: ${linearUpdate.error}`
          )
        }
      } catch (error) {
        console.error('❌ Demo: Error updating Linear task status:', error)
        // Continue with request update even if Linear fails
      }
    }

    // Get organization info from Clerk
    const org = await getClerkOrganization(updatedRequest.clerkOrgId)

    // Trigger real-time update
    await triggerRequestUpdate(updatedRequest.clerkOrgId, {
      ...updatedRequest,
      businessArea: updatedRequest.businessArea || '',
      serviceType: updatedRequest.serviceType || '',
      user: {
        name: updatedRequest.user.name,
        email: updatedRequest.user.email,
        imageUrl: updatedRequest.user.imageUrl,
      },
      organization: org ? { name: org.name } : undefined,
    })

    return NextResponse.json({
      success: true,
      message: `Request ${requestId} status updated to ${newStatus}`,
      request: updatedRequest,
    })
  } catch (error) {
    console.error('Demo status update error:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}
