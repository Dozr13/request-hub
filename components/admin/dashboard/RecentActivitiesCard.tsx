import { Card, CardContent } from '@/components/ui'
import type { RecentActivity } from '@/types'
import { ActivityItem } from './ActivityItem'

interface RecentActivitiesCardProps {
  activities: RecentActivity[]
}

export const RecentActivitiesCard = ({
  activities,
}: RecentActivitiesCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Updates & Notifications
          </h2>
          <p className="text-sm text-gray-600">
            Latest platform activities and system notifications
          </p>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
