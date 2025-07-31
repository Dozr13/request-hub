import { createRequest, CreateRequestApiRequest } from '@/lib/api/requests'
import { getImpersonationContext } from '@/lib/auth'
import {
  getEffectivePermissions,
  IMPERSONATION_CONFIG,
} from '@/lib/config/impersonation'
import { prisma } from '@/lib/database'
import { triggerNewRequest } from '@/lib/integrations'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const impersonationContext = await getImpersonationContext()

    if (!impersonationContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { effectiveUser, isImpersonating, originalUserRole } =
      impersonationContext

    // Get permissions based on current impersonation model
    const permissions = getEffectivePermissions({
      effectiveUser,
      originalUserRole,
      isImpersonating,
    })

    // * Debug logging in development
    if (IMPERSONATION_CONFIG.debugPermissions) {
      console.log('🔍 Request Permissions:', {
        isImpersonating,
        originalUserRole,
        effectiveUserRole: effectiveUser.role,
        effectiveUserOrg: effectiveUser.clerkOrgId,
        finalPermissions: permissions,
      })
    }

    // Build where clause based on permissions
    let whereClause = {}

    if (permissions.canAccessAllOrgs) {
      // Can see all requests across all organizations
      whereClause = {}
    } else {
      // Limited to specific organization
      whereClause = { clerkOrgId: permissions.orgId }
    }

    const requests = await prisma.request.findMany({
      where: whereClause,
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
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: requests,
      meta: {
        total: requests.length,
        permissions: IMPERSONATION_CONFIG.debugPermissions
          ? permissions
          : undefined,
      },
    })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const impersonationContext = await getImpersonationContext()

    if (!impersonationContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { effectiveUser, isImpersonating, originalUserRole } =
      impersonationContext

    // Get permissions for creating requests
    const permissions = getEffectivePermissions({
      effectiveUser,
      originalUserRole,
      isImpersonating,
    })

    // Debug logging
    if (IMPERSONATION_CONFIG.debugPermissions) {
      console.log('🔍 Create Request Permissions:', {
        isImpersonating,
        originalUserRole,
        effectiveUserRole: effectiveUser.role,
        permissions,
      })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create request as the effective user (impersonated user if impersonating)
    // This also creates Linear task automatically
    const createRequestData: CreateRequestApiRequest = {
      title: body.title,
      description: body.description,
      category: body.category,
      businessArea: body.businessArea || '',
      serviceType: body.serviceType || '',
      priority: body.priority || 'MEDIUM',
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    }

    const newRequest = await createRequest(effectiveUser.id, createRequestData)

    // Log Linear task creation if successful
    if (newRequest.linearTask) {
      console.log('Linear task created:', newRequest.linearTask)
    } else {
      console.log(
        'No Linear task created (Linear integration may not be configured)'
      )
    }

    // Format for real-time update (matches RequestData interface)
    const requestData = {
      ...newRequest,
      businessArea: newRequest.businessArea || '',
      serviceType: newRequest.serviceType || '',
      user: {
        name: newRequest.user.name,
        email: newRequest.user.email,
        imageUrl: newRequest.user.imageUrl,
      },
      organization: newRequest.organization || {
        name: effectiveUser.clerkOrgId, // Using org ID as fallback
      },
    }

    // Trigger real-time update for the organization
    await triggerNewRequest(effectiveUser.clerkOrgId, requestData)

    return NextResponse.json({
      success: true,
      data: newRequest,
      linearTask: newRequest.linearTask, // Include Linear task info in response
      meta: {
        createdBy: isImpersonating ? 'impersonated_user' : 'original_user',
        permissions: IMPERSONATION_CONFIG.debugPermissions
          ? permissions
          : undefined,
      },
    })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
