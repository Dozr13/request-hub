import type { DashboardStats } from '@/types'
import { StatsCard } from './StatsCard'

interface DashboardStatsGridProps {
  stats: DashboardStats
}

export const DashboardStatsGrid = ({ stats }: DashboardStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatsCard
        title="Total Users"
        value={stats.totalUsers}
        change="+12.1% from last month"
        changeColor="text-green-600"
        icon="Users"
      />

      <StatsCard
        title="New Companies"
        value={`+${stats.newCompanies}`}
        change="+4.2% from last month"
        changeColor="text-green-600"
        icon="Building2"
      />

      <StatsCard
        title="Active Requests"
        value={stats.activeRequests}
        change="+6% since last hour"
        changeColor="text-green-600"
        icon="FileText"
      />

      <StatsCard
        title="New Sign-ups"
        value={`+${stats.newSignups}`}
        change="+301 since last week"
        changeColor="text-green-600"
        icon="UserPlus"
      />

      <StatsCard
        title="Community Events"
        value={stats.communityEvents}
        change="Occurring this month"
        changeColor="text-gray-600"
        icon="Calendar"
      />
    </div>
  )
}
