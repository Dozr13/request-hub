export interface DashboardStats {
  totalUsers: number
  newCompanies: number
  activeRequests: number
  newSignups: number
  communityEvents: number
}

export interface RecentActivity {
  id: string
  type: 'user_signup' | 'company_update' | 'system_maintenance'
  title: string
  description: string
  timestamp: Date
  icon: 'user' | 'building' | 'system'
}

export interface AdminDashboardData {
  stats: DashboardStats
  activities: RecentActivity[]
}
