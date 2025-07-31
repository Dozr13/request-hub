import { getImpersonationContext } from '@/lib/auth/impersonation'
import {
  getEffectivePermissions,
  IMPERSONATION_CONFIG,
} from '@/lib/config/impersonation'
import { prisma } from '@/lib/database'
import {
  triggerRequestUpdate,
  updateLinearTaskStatus,
} from '@/lib/integrations'
import { NextRequest, NextResponse } from 'next/server'

// GET: Fetch a single request by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const impersonationContext = await getImpersonationContext()

    if (!impersonationContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { effectiveUser, isImpersonating, originalUserRole } =
      impersonationContext

    // Get permissions
    const permissions = getEffectivePermissions({
      effectiveUser,
      originalUserRole,
      isImpersonating,
    })

    const { id } = params

    const requestData = await prisma.request.findUnique({
      where: { id },
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

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Check access permissions
    const canAccess =
      permissions.canAccessAllOrgs ||
      requestData.clerkOrgId === permissions.orgId

    if (!canAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Debug logging
    if (IMPERSONATION_CONFIG.debugPermissions) {
      console.log('🔍 Request Access Check:', {
        requestId: id,
        requestOrg: requestData.clerkOrgId,
        userPermissions: permissions,
        canAccess,
      })
    }

    return NextResponse.json({
      success: true,
      data: requestData,
      meta: {
        permissions: IMPERSONATION_CONFIG.debugPermissions
          ? permissions
          : undefined,
      },
    })
  } catch (error) {
    console.error('Error fetching request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH: Update a request
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const impersonationContext = await getImpersonationContext()

    if (!impersonationContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { effectiveUser, isImpersonating, originalUserRole } =
      impersonationContext

    // Get permissions
    const permissions = getEffectivePermissions({
      effectiveUser,
      originalUserRole,
      isImpersonating,
    })

    const { id } = params
    const body = await request.json()

    // Find the existing request
    const existingRequest = await prisma.request.findUnique({
      where: { id },
    })

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Check update permissions
    const canUpdate =
      permissions.canAccessAllOrgs ||
      existingRequest.userId === effectiveUser.id ||
      (effectiveUser.role === 'ADMIN' &&
        existingRequest.clerkOrgId === effectiveUser.clerkOrgId)

    if (!canUpdate) {
      return NextResponse.json({ error: 'Update denied' }, { status: 403 })
    }

    // Update the request
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
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

    // Update Linear task status if status changed and Linear task exists
    if (body.status && updatedRequest.linearTaskId) {
      try {
        const linearUpdate = await updateLinearTaskStatus(
          updatedRequest.linearTaskId,
          body.status
        )

        if (linearUpdate.success) {
          console.log(
            `📋 Linear task ${updatedRequest.linearTaskId} status updated to match request status: ${body.status}`
          )
        } else {
          console.warn(
            `Failed to update Linear task status: ${linearUpdate.error}`
          )
        }
      } catch (error) {
        console.error('❌ Error updating Linear task status:', error)
        // Continue with request update even if Linear fails
      }
    }

    // Format for real-time update
    const requestData = {
      ...updatedRequest,
      businessArea: updatedRequest.businessArea || '',
      serviceType: updatedRequest.serviceType || '',
      user: {
        name: updatedRequest.user.name,
        email: updatedRequest.user.email,
        imageUrl: updatedRequest.user.imageUrl,
      },
      organization: {
        name: updatedRequest.clerkOrgId,
      },
    }

    // Trigger real-time update
    await triggerRequestUpdate(updatedRequest.clerkOrgId, requestData)

    // Debug logging
    if (IMPERSONATION_CONFIG.debugPermissions) {
      console.log('🔍 Request Update:', {
        requestId: id,
        updatedBy: isImpersonating ? 'impersonated_user' : 'original_user',
        permissions,
      })
    }

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      meta: {
        updatedBy: isImpersonating ? 'impersonated_user' : 'original_user',
        permissions: IMPERSONATION_CONFIG.debugPermissions
          ? permissions
          : undefined,
      },
    })
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a request
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const impersonationContext = await getImpersonationContext()

    if (!impersonationContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { effectiveUser, isImpersonating, originalUserRole } =
      impersonationContext

    // Get permissions
    const permissions = getEffectivePermissions({
      effectiveUser,
      originalUserRole,
      isImpersonating,
    })

    const { id } = params

    // Find the existing request
    const existingRequest = await prisma.request.findUnique({
      where: { id },
    })

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Check delete permissions
    const canDelete =
      permissions.canAccessAllOrgs ||
      existingRequest.userId === effectiveUser.id ||
      (effectiveUser.role === 'ADMIN' &&
        existingRequest.clerkOrgId === effectiveUser.clerkOrgId)

    if (!canDelete) {
      return NextResponse.json({ error: 'Delete denied' }, { status: 403 })
    }

    // Delete the request
    await prisma.request.delete({
      where: { id },
    })

    // Debug logging
    if (IMPERSONATION_CONFIG.debugPermissions) {
      console.log('🔍 Request Deletion:', {
        requestId: id,
        deletedBy: isImpersonating ? 'impersonated_user' : 'original_user',
        permissions,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Request deleted successfully',
      meta: {
        deletedBy: isImpersonating ? 'impersonated_user' : 'original_user',
        permissions: IMPERSONATION_CONFIG.debugPermissions
          ? permissions
          : undefined,
      },
    })
  } catch (error) {
    console.error('Error deleting request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
