'use client'

import { Badge } from '@/components/ui'
import { Button } from '@/components/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Icon } from '@/components/ui'
import type { IconName } from '@/lib/ui/icons'
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  newCompanies: number
  activeRequests: number
  newSignups: number
  communityEvents: number
}

interface EnhancedAdminDashboardProps {
  stats: DashboardStats
}

const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  iconName,
  trend = 'up',
  color = 'blue',
}: {
  title: string
  value: string | number
  change: string
  changeLabel: string
  iconName: IconName
  trend?: 'up' | 'down'
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}
        >
          <Icon name={iconName} className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {value.toLocaleString()}
        </div>
        <div className="flex items-center text-xs text-gray-600">
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
          )}
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {change}
          </span>
          <span className="ml-1">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

const ActivityItem = ({
  title,
  description,
  timestamp,
  status = 'info',
}: {
  title: string
  description: string
  timestamp: string
  status?: 'info' | 'success' | 'warning' | 'error'
}) => {
  const statusIcons = {
    info: <Activity className="w-4 h-4 text-blue-500" />,
    success: <CheckCircle className="w-4 h-4 text-green-500" />,
    warning: <AlertCircle className="w-4 h-4 text-orange-500" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
  }

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="mt-0.5">{statusIcons[status]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  )
}

export function EnhancedAdminDashboard({ stats }: EnhancedAdminDashboardProps) {
  const recentActivities = [
    {
      type: 'user_signup',
      title: 'New user signup',
      description: 'Alex Rodriguez joined TechCorp',
      timestamp: '2 minutes ago',
      status: 'success' as const,
    },
    {
      type: 'request_submitted',
      title: 'New request submitted',
      description:
        'Emma Thompson submitted "B2B customer acquisition strategy"',
      timestamp: '30 minutes ago',
      status: 'info' as const,
    },
    {
      type: 'request_completed',
      title: 'Request completed',
      description: 'Marketing campaign optimization completed for FinTech',
      timestamp: '2 hours ago',
      status: 'success' as const,
    },
    {
      type: 'system_alert',
      title: 'High request volume',
      description: 'TechCorp has submitted 15 requests in the last hour',
      timestamp: '3 hours ago',
      status: 'warning' as const,
    },
    {
      type: 'integration',
      title: 'Linear sync completed',
      description: 'All requests synchronized with Linear workspace',
      timestamp: '4 hours ago',
      status: 'success' as const,
    },
  ]

  const quickActions = [
    { label: 'Create Request', iconName: 'FileText' as IconName },
    { label: 'Add Company', iconName: 'Building2' as IconName },
    { label: 'Invite User', iconName: 'UserPlus' as IconName },
    { label: 'System Report', iconName: 'BarChart3' as IconName },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Platform Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor platform activities and manage operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            All Systems Operational
          </Badge>
          <Button>
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change="+12.1%"
          changeLabel="from last month"
          iconName="Users"
          color="blue"
        />
        <StatCard
          title="New Companies"
          value={`+${stats.newCompanies}`}
          change="+4.2%"
          changeLabel="from last month"
          iconName="Building2"
          color="green"
        />
        <StatCard
          title="Active Requests"
          value={stats.activeRequests}
          change="+8%"
          changeLabel="since last hour"
          iconName="FileText"
          color="purple"
        />
        <StatCard
          title="New Sign-ups"
          value={`+${stats.newSignups}`}
          change="+901"
          changeLabel="since last week"
          iconName="UserPlus"
          color="orange"
        />
        <StatCard
          title="Community Events"
          value={stats.communityEvents}
          change="Occurring"
          changeLabel="this month"
          iconName="Calendar"
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Updates & Notifications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Updates & Notifications
                </CardTitle>
                <Badge variant="outline">Live</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Latest platform activities and system notifications
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full">
                  View All Activities
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & System Health */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Quick Actions
              </CardTitle>
              <p className="text-sm text-gray-600">
                Frequently used operations
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Icon name={action.iconName} className="w-4 h-4 mr-3" />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Database" className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Database</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">API</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Settings" className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">External Services</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
