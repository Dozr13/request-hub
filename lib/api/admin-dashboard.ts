import type {
  AdminDashboardData,
  DashboardStats,
  RecentActivity,
} from '@/types'
import { prisma } from '../database'

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const [totalUsers, totalOrganizations, activeRequests, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.organizationMeta.count(),
      prisma.request.count({
        where: {
          status: { in: ['SUBMITTED', 'IN_PROGRESS', 'REVIEWING'] },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
    ])

  return {
    totalUsers,
    newCompanies: totalOrganizations, // Keeping the field name for compatibility
    activeRequests,
    newSignups: recentUsers,
    communityEvents: 5, // Mock data for now
  }
}

// Get all requests across all companies for admin view
export const fetchAllRequestsForAdmin = async (companyFilter?: string) => {
  const whereClause = companyFilter ? { clerkOrgId: companyFilter } : {}

  return await prisma.request.findMany({
    where: whereClause,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          role: true,
          clerkOrgId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

// Get all companies for filtering
export const fetchAllCompanies = async () => {
  return await prisma.organizationMeta.findMany({
    select: {
      clerkOrgId: true,
    },
  })
}

// Map org IDs to friendly names for the admin dashboard
export const getCompanyDisplayNames = () => ({
  org_30PWBDe4wjMYWRsf7l0QcGhjKLQ: 'TechCorp',
  org_30PWEbUNmjCn9L5QsTl0NdjsJGB: 'FinTech',
  org_30PWICTi4Lu915bIrd0Ww2nxI7U: 'HTV Admin',
  org_30P9yxXysREHXm7vf5XhoGQ0K6u: 'E2E Test',
})

export const generateMockActivities = (): RecentActivity[] => [
  {
    id: '1',
    type: 'user_signup',
    title: 'New user signup',
    description: 'Alex Rodriguez joined TechCorp',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    icon: 'user',
  },
  {
    id: '2',
    type: 'company_update',
    title: 'New request submitted',
    description: 'Emma Thompson submitted "B2B customer acquisition strategy"',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    icon: 'building',
  },
  {
    id: '3',
    type: 'system_maintenance',
    title: 'Request completed',
    description: 'Marketing campaign optimization completed for FinTech',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: 'system',
  },
]

/**
 * @deprecated Use requireAdminUser() + fetchDashboardStats() + generateMockActivities() instead
 */
export const getDashboardData = async (): Promise<AdminDashboardData> => {
  // This is kept for backward compatibility but should be migrated
  const [stats, activities] = await Promise.all([
    fetchDashboardStats(),
    Promise.resolve(generateMockActivities()),
  ])

  return { stats, activities }
}
