'use client'

import { CreateRequestSection } from '@/components/requests/forms/CreateRequestSection'
import { NewRequestDialog } from '@/components/requests/forms/NewRequestDialog'
import { EmptyRequestsState } from '@/components/requests/list/EmptyRequestsState'
import { IntroContainer } from '@/components/requests/list/IntroContainer'
import { RequestFilters } from '@/components/requests/list/RequestFilters'
import { VirtualizedRequestList } from '@/components/requests/list/VirtualizedRequestList'
import { ConnectionStatus, SearchInput } from '@/components/ui'
import { useRealTimeRequests, useRequests } from '@/lib/hooks'
import { calculateStatusCounts, filterRequestsByStatus } from '@/lib/utils'
import { FilterType, RequestsPageClientProps } from '@/types'
import { useMemo, useState } from 'react'

export const RequestsPageClient = ({ user }: RequestsPageClientProps) => {
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: requests = [], isLoading, error } = useRequests()

  const { isConnected, connectionState } = useRealTimeRequests({
    clerkOrgId: user.clerkOrgId || 'default',
    enabled: true,
  })

  // Memoize filtered and searched requests for better performance
  const filteredRequests = useMemo(() => {
    let filtered = filterRequestsByStatus(requests, activeFilter)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (request) =>
          request.title.toLowerCase().includes(query) ||
          request.description.toLowerCase().includes(query) ||
          request.category.toLowerCase().includes(query) ||
          request.user.name?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [requests, activeFilter, searchQuery])

  const statusCounts = useMemo(
    () => calculateStatusCounts(requests),
    [requests]
  )

  const handleCreateRequest = () => {
    setIsNewRequestDialogOpen(true)
  }

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Loading state is now handled by the root loading.tsx for /requests route

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-5.5">
          <IntroContainer />
        </div>
        <div className="text-center py-12">
          <p className="text-red-600">
            Failed to load requests. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex-shrink-0 mb-8">
        <IntroContainer />
      </div>

      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        <CreateRequestSection onCreateRequest={handleCreateRequest} />
        {/* Connection Status */}{' '}
        <ConnectionStatus
          isConnected={isConnected}
          connectionState={connectionState}
          className="text-sm font-medium justify-self-end self-start"
        />
      </div>

      <div className="flex-shrink-0 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Requests</h2>

        <div className="flex items-center justify-between w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex-1">
            <RequestFilters
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              statusCounts={statusCounts}
            />
          </div>

          <div className="flex items-center space-x-4 ml-6">
            <SearchInput
              placeholder="Search requests..."
              onSearch={handleSearch}
              className="w-80"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {filteredRequests.length === 0 ? (
          <EmptyRequestsState activeFilter={activeFilter} />
        ) : (
          <VirtualizedRequestList
            requests={filteredRequests}
            isLoading={isLoading}
          />
        )}
      </div>

      <NewRequestDialog
        open={isNewRequestDialogOpen}
        onOpenChange={setIsNewRequestDialogOpen}
        currentUser={user}
      />
    </div>
  )
}
