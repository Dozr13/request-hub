import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { Button } from '@/components/ui'
import { Card, CardContent } from '@/components/ui'
import { Icon } from '@/components/ui'
import { getAvatarUrl } from '@/lib/utils'
import type { DetailsCardProps } from '@/types'

export const DetailsCard = ({ request }: DetailsCardProps) => {
  return (
    <Card className="bg-white">
      <CardContent>
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Details</h3>

        <div className="space-y-1 text-sm">
          <div className="flex justify-start items-center py-1.5 border-b border-gray-100">
            <div className="text-xs text-gray-500 w-25">Created on</div>
            <div className="text-xs text-gray-900 font-medium">
              {new Date(request.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>

          <div className="flex justify-start items-center py-1.5 border-b border-gray-100">
            <div className="text-xs text-gray-500 w-25">Business area</div>
            <div className="text-xs text-gray-900 font-medium">
              {request.category.replace('_', ' ')}
            </div>
          </div>

          <div className="flex justify-start items-center py-1.5 border-b border-gray-100">
            <div className="text-xs text-gray-500 w-25">Requested by</div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={getAvatarUrl(request.user).url} />
                <AvatarFallback className="text-xs">
                  {getAvatarUrl(request.user).initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-900 font-medium">
                {request.user.name}
              </span>
            </div>
          </div>

          <div className="flex justify-start items-center py-1.5 border-b border-gray-100">
            <div className="text-xs text-gray-500 w-25">Partner</div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={getAvatarUrl(request.user).url} />
                <AvatarFallback className="text-xs">
                  {getAvatarUrl(request.user).initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-900 font-medium">
                {request.user.name}
              </span>
            </div>
          </div>

          <div className="flex justify-start items-center py-1.5">
            <div className="text-xs text-gray-500 w-25">Request ID</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-900 font-medium">
                {request.id.slice(-12)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-gray-400 hover:text-gray-600"
              >
                <Icon name="Copy" className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
