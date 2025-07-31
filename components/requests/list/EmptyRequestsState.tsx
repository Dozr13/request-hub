'use client'

import { Icon } from '@/components/ui'
import type { FilterType } from '@/types'

interface EmptyRequestsStateProps {
  activeFilter: FilterType
}

export const EmptyRequestsState = ({
  activeFilter,
}: EmptyRequestsStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon name="Plus" className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No requests found
      </h3>
      <p className="text-gray-500">
        {activeFilter === 'all'
          ? 'You can create a new request here.'
          : `No requests found for "${activeFilter}" filter.`}
      </p>
    </div>
  )
}
