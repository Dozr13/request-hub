import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { Card, CardContent } from '@/components/ui'
import { getAvatarUrl } from '@/lib/utils'
import type { MeetingCardProps } from '@/types'

export const MeetingCard = ({ request, meetingInfo }: MeetingCardProps) => {
  return (
    <Card className="bg-request-hub-dark text-white py-0 mb-3 overflow-hidden border-0 rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base text-white">
              {meetingInfo.title}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs bg-white text-gray-900 px-2 py-1 rounded font-bold">
              {meetingInfo.reminder}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 border-2 border-gray-700">
              <AvatarImage src={getAvatarUrl(request.user).url} />
              <AvatarFallback className="text-xs bg-gray-600 text-white">
                {getAvatarUrl(request.user).initials}
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 border-2 border-gray-700 -ml-1">
              <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="text-xs bg-gray-600 text-white">
                DK
              </AvatarFallback>
            </Avatar>
            <div className="w-px h-6 bg-request-hub-border mx-1"></div>
            <div className="text-xs text-white">{meetingInfo.date}</div>
          </div>
          <span className="text-xs text-white font-medium">Reminder</span>
        </div>
      </CardContent>
    </Card>
  )
}
