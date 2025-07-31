import type { AdminDashboardData } from '@/types'
import {
  AdminDashboardHeader,
  DashboardStatsGrid,
  RecentActivitiesCard,
} from './dashboard'

interface AdminDashboardViewProps {
  data: AdminDashboardData
}

export const AdminDashboardView = ({ data }: AdminDashboardViewProps) => {
  return (
    <div className="space-y-6">
      <AdminDashboardHeader />
      <DashboardStatsGrid stats={data.stats} />
      <RecentActivitiesCard activities={data.activities} />
    </div>
  )
}
