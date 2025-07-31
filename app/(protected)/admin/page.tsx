import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminRequestsView } from '@/components/admin/AdminRequestsView'
import { EnhancedAdminDashboard } from '@/components/admin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { fetchDashboardStats } from '@/lib/api/admin-dashboard'
import { requireAdminUser } from '@/lib/auth/page-auth'

export default async function AdminPage() {
  // Ensure admin access and get user context
  const { effectiveUser } = await requireAdminUser()

  // Fetch dashboard data
  const stats = await fetchDashboardStats()

  const currentUser = {
    name: effectiveUser.name,
    email: effectiveUser.email,
    role: effectiveUser.role,
    imageUrl: effectiveUser.imageUrl || undefined,
  }

  return (
    <AdminLayout currentUser={currentUser}>
      <Tabs defaultValue="overview" className="h-full">
        <div className="border-b border-gray-200 px-6 py-4 bg-white">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="overview" className="px-8">
              Platform Overview
            </TabsTrigger>
            <TabsTrigger value="requests" className="px-8">
              Request Management
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="m-0 h-full">
          <EnhancedAdminDashboard stats={stats} />
        </TabsContent>

        <TabsContent value="requests" className="m-0 h-full">
          <div className="p-6">
            <AdminRequestsView userRole={effectiveUser.role} />
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
