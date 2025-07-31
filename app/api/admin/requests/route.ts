import {
  fetchAllRequestsForAdmin,
  getCompanyDisplayNames,
} from '@/lib/api/admin-dashboard'
import { requireAdminUser } from '@/lib/auth/page-auth'
import { prisma } from '@/lib/database'
import { updateLinearTaskStatus } from '@/lib/integrations'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Ensure admin access
    await requireAdminUser()

    // Get company filter from query params
    const { searchParams } = new URL(request.url)
    const companyFilter = searchParams.get('company') || undefined

    // Fetch requests with optional company filter
    const requests = await fetchAllRequestsForAdmin(companyFilter)

    // Add company display names to each request
    const companyNames = getCompanyDisplayNames()
    const requestsWithCompanyNames = requests.map((request) => ({
      ...request,
      companyName:
        companyNames[request.clerkOrgId as keyof typeof companyNames] ||
        request.clerkOrgId,
    }))

    return NextResponse.json({
      requests: requestsWithCompanyNames,
      totalCount: requests.length,
    })
  } catch (error) {
    console.error('Error fetching admin requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Ensure admin access
    await requireAdminUser()

    const { requestId, status } = await request.json()

    if (!requestId || !status) {
      return NextResponse.json(
        { error: 'Request ID and status are required' },
        { status: 400 }
      )
    }

    // Update request status
    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            role: true,
          },
        },
      },
    })

    // Update Linear task status if Linear task exists
    if (updatedRequest.linearTaskId) {
      try {
        const linearUpdate = await updateLinearTaskStatus(
          updatedRequest.linearTaskId,
          status
        )

        if (linearUpdate.success) {
          console.log(
            `Admin: Linear task ${updatedRequest.linearTaskId} status updated to: ${status}`
          )
        } else {
          console.warn(
            `Admin: Failed to update Linear task status: ${linearUpdate.error}`
          )
        }
      } catch (error) {
        console.error('Admin: Error updating Linear task status:', error)
        // Continue with request update even if Linear fails
      }
    }

    return NextResponse.json({ request: updatedRequest })
  } catch (error) {
    console.error('Error updating request status:', error)
    return NextResponse.json(
      { error: 'Failed to update request status' },
      { status: 500 }
    )
  }
}
