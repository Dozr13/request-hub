import { RequestsPageClient } from '@/components/requests/views/RequestsPageClient'
import { getAuthenticatedUser } from '@/lib/auth/page-auth'

export default async function RequestsPage() {
  // Middleware handles auth, so we can directly get user data
  // Requests will be fetched client-side with React Query
  const { user } = await getAuthenticatedUser()

  return <RequestsPageClient user={user} />
}
