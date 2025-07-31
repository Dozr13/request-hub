import { RequestDetailsView } from '@/components/requests'
import { getImpersonationContext } from '@/lib/auth'
import {
  getRequestDetails,
  getUserWithOrgId,
  transformToRequestDetails,
} from '@/lib/requests'
import { UserRole } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Force dynamic rendering because we use authentication context
export const dynamic = 'force-dynamic'

interface RequestDetailsPageProps {
  params: Promise<{ id: string }>
}

// Custom Access Denied component
function AccessDenied({ requestId }: { requestId: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to view this request.
        </p>
        <div className="space-y-3">
          <Link
            href="/requests"
            className="w-full inline-flex justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Requests
          </Link>
          <Link
            href="/home"
            className="w-full inline-flex justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4">Request ID: {requestId}</p>
      </div>
    </div>
  )
}

export default async function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  // Handle authentication and get impersonation context
  const impersonationContext = await getImpersonationContext()

  if (!impersonationContext) {
    notFound()
  }

  const { effectiveUser, isImpersonating, originalUserRole } =
    impersonationContext
  const { id } = await params

  // Get user's organization info
  const fullUser = await getUserWithOrgId(effectiveUser.id)
  if (!fullUser) {
    notFound()
  }

  // Fetch the request with authorization
  const result = await getRequestDetails({
    requestId: id,
    effectiveUserId: effectiveUser.id,
    userRole: effectiveUser.role,
    userClerkOrgId: fullUser.clerkOrgId,
    originalUserRole,
    isImpersonating,
  })

  if (result.error === 'NOT_FOUND') {
    notFound()
  }

  if (result.error === 'ACCESS_DENIED') {
    return <AccessDenied requestId={id} />
  }

  if (!result.request) {
    notFound()
  }

  // Transform to RequestDetails interface
  const transformedRequest = await transformToRequestDetails(result.request)

  return (
    <RequestDetailsView
      requestId={result.request.id}
      initialRequest={transformedRequest}
      userRole={effectiveUser.role as UserRole}
      clerkOrgId={fullUser.clerkOrgId}
    />
  )
}
