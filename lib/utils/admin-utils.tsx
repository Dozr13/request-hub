import { AlertTriangle, Bell, CheckCircle, Users } from 'lucide-react'

export const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  )

  if (diffInMinutes < 1) return 'just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
}

const activityIconMap = {
  user_signup: (
    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
      <Users className="w-4 h-4 text-blue-600" />
    </div>
  ),
  company_update: (
    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
      <CheckCircle className="w-4 h-4 text-green-600" />
    </div>
  ),
  system_maintenance: (
    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
      <AlertTriangle className="w-4 h-4 text-yellow-600" />
    </div>
  ),
} as const

export const getActivityIcon = (type: string) => {
  return (
    activityIconMap[type as keyof typeof activityIconMap] ?? (
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <Bell className="w-4 h-4 text-gray-600" />
      </div>
    )
  )
}
