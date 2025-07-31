import { StatusOption } from '@/types'

export const STATUS_OPTIONS: StatusOption[] = [
  {
    status: 'SUBMITTED',
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    status: 'IN_PROGRESS',
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    status: 'REVIEWING',
    label: 'Reviewing',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    status: 'COMPLETED',
    label: 'Completed',
    color: 'bg-green-100 text-green-800',
  },
  {
    status: 'ACTION_REQUIRED',
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
  },
]
