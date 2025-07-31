import { Card, CardContent } from '@/components/ui'
import { Icon } from '@/components/ui'
import { IconName } from '@/lib/ui/icons'

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  changeColor: string
  icon: IconName
}

export const StatsCard = ({
  title,
  value,
  change,
  changeColor,
  icon,
}: StatsCardProps) => {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            <p className={`text-xs ${changeColor} mt-1`}>{change}</p>
          </div>
          <Icon name={icon} className="w-5 h-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}
