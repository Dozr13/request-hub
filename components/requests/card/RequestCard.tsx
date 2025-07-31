'use client'

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  OptimizedAvatar,
} from '@/components/ui'
import { getStatusBadgeVariant } from '@/lib/utils'
import { RequestWithUser } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { RequestProgressBar } from '../shared'

interface RequestCardProps {
  request: RequestWithUser
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/requests/${request.id}`)
  }

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'New'
      case 'ACTION_REQUIRED':
        return 'Action Required'
      case 'IN_PROGRESS':
        return 'In Progress'
      case 'REVIEWING':
        return 'Reviewing'
      default:
        return status.replace('_', ' ')
    }
  }

  return (
    <Card
      className="htv-card cursor-pointer transform !shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:!shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col h-full min-h-[280px]"
      onClick={handleCardClick}
      data-testid="request-card"
    >
      <div className="px-5">
        <RequestProgressBar
          status={request.status}
          showAnimation={false}
          showLabels={false}
          className="w-full"
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>
              {new Date(request.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              ,{' '}
              {new Date(request.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <OptimizedAvatar
            src={request.user.imageUrl || undefined}
            alt={request.user.name || 'User'}
            fallback={request.user.name || 'U'}
            size={48}
          />
        </div>
      </CardHeader>

      {/* Content section */}
      <CardContent className="flex flex-col h-full">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 text-base mb-2 leading-tight line-clamp-2">
                {request.title}
              </h3>

              <span className="text-xs font-semibold text-htv-text-secondary uppercase tracking-wide">
                {request.category.replace('_', ' ')} /{' '}
                {request.serviceType || 'General'}
              </span>
            </div>

            <p className="text-sm text-htv-text-secondary leading-relaxed line-clamp-3">
              {request.description}
            </p>
          </div>

          {/* Bottom section */}
          <div className="mt-auto pt-4 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={getStatusBadgeVariant(request.status)}
                className={`text-xs font-medium ${
                  request.status === 'SUBMITTED'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : request.status === 'ACTION_REQUIRED'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : request.status === 'IN_PROGRESS'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : request.status === 'REVIEWING'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : request.status === 'COMPLETED'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {getStatusDisplayName(request.status)}
              </Badge>

              <span className="inline-flex items-center font-medium bg-[#E8F5E9] text-htv-green px-2 py-1 text-xs rounded-md gap-1.5">
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
