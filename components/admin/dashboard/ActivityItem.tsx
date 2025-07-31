import { formatTimeAgo, getActivityIcon } from '@/lib/utils'
import type { RecentActivity } from '@/types'

interface ActivityItemProps {
  activity: RecentActivity
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  return (
    <div className="flex items-start space-x-3">
      {getActivityIcon(activity.type)}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
          <p className="text-xs text-gray-500">
            {formatTimeAgo(activity.timestamp)}
          </p>
        </div>
        <p className="text-sm text-gray-600">{activity.description}</p>
      </div>
    </div>
  )
}
