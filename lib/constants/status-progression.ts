import { IconName } from '@/lib/ui/icons'
import { RequestStatus } from '@/types'

export const STATUS_PROGRESSION: {
  status: RequestStatus
  label: string
  description: string
  color: string
  icon: IconName
}[] = [
  {
    status: 'SUBMITTED',
    label: 'Start Progress',
    description: 'Start work on this request',
    color: 'bg-blue-600 hover:bg-blue-700',
    icon: 'Play',
  },
  {
    status: 'IN_PROGRESS',
    label: 'Send for Review',
    description: 'Submit work for client review',
    color: 'bg-purple-600 hover:bg-purple-700',
    icon: 'Send',
  },
  {
    status: 'REVIEWING',
    label: 'Mark Complete',
    description: 'Finalize and complete the request',
    color: 'bg-green-600 hover:bg-green-700',
    icon: 'Check',
  },
  {
    status: 'COMPLETED',
    label: 'Completed',
    description: 'Request completed successfully',
    color: 'bg-gray-500',
    icon: 'CheckCircle',
  },
]
