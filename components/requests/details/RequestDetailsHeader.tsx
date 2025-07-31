import { Badge, Button, ConnectionStatus, Icon } from '@/components/ui'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRealTimeRequests } from '../../../lib/hooks/useRealTimeRequests'

interface RequestDetailsHeaderProps {
  request: {
    title: string
    status: string
    createdAt: Date
  }
  clerkOrgId: string
  isStatusUpdating?: boolean
}

export const RequestDetailsHeader = ({
  request,
  clerkOrgId,
  isStatusUpdating = false,
}: RequestDetailsHeaderProps) => {
  const { isConnected, connectionState } = useRealTimeRequests({
    clerkOrgId: clerkOrgId,
    enabled: !!clerkOrgId,
  })

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <Link href="/requests">
          <Button variant="ghost" size="sm" className="gap-2">
            <Icon name="ArrowLeft" className="h-4 w-4" />
            Requests
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {request.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              {new Date(request.createdAt)
                .toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
                .replace(/\//g, '.')}
            </span>
            <Badge
              className={cn(
                'bg-blue-50 text-blue-700 border-blue-200',
                isStatusUpdating && 'animate-pulse'
              )}
            >
              <div className="flex items-center gap-1">
                {isStatusUpdating && (
                  <Icon name="Loader2" className="w-3 h-3 animate-spin" />
                )}
                {request.status === 'SUBMITTED'
                  ? 'New'
                  : request.status === 'IN_PROGRESS'
                    ? 'In Progress'
                    : request.status.replace('_', ' ')}
              </div>
            </Badge>
            <div className="flex items-center gap-1">
              <span className="font-medium bg-[#E8F5E9] text-htv-green px-2 py-1 text-xs rounded-md flex items-center gap-1">
                <Image
                  src="/icons/GoogleMeets.svg"
                  alt="Google Meet"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Scheduled Call
              </span>
            </div>

            <ConnectionStatus
              isConnected={isConnected}
              connectionState={connectionState}
              className="text-sm font-medium justify-self-end self-start"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
