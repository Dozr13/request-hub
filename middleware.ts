import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Protect specific routes that are in the (protected) folder
// Route groups like (protected) don't appear in URLs!
const isProtectedRoute = createRouteMatcher([
  '/requests(.*)',
  '/home(.*)',
  '/admin(.*)',
  '/resources(.*)',
  '/settings(.*)',
  '/community(.*)',
  '/company(.*)',
  '/profile(.*)',
  '/api/requests(.*)',
  '/api/users(.*)',
  '/api/admin(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware for root path to avoid interference with auth flow
  if (req.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  // First, protect all protected routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  // Then check admin authorization
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ role: 'org:admin' }) || has({ role: 'org:super_admin' })
    })
  }

  // Add headers for API routes if user is authenticated
  if (req.nextUrl.pathname.startsWith('/api/') && isProtectedRoute(req)) {
    const { userId, orgId, orgRole } = await auth()

    if (userId) {
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set('x-user-id', userId)
      if (orgId) requestHeaders.set('x-org-id', orgId)
      if (orgRole) requestHeaders.set('x-org-role', orgRole)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
