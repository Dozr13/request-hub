import {
  PUSHER_CHANNELS,
  PUSHER_EVENTS,
  pusherClient,
} from '@/lib/integrations/pusher'
import { RequestStatus, RequestWithUser } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

// Helper function to deduplicate requests by ID
const deduplicateRequests = (
  requests: RequestWithUser[]
): RequestWithUser[] => {
  const seen = new Set<string>()
  return requests.filter((request) => {
    if (seen.has(request.id)) {
      console.warn('Duplicate request found and removed:', request.id)
      return false
    }
    seen.add(request.id)
    return true
  })
}

// Fetch requests with caching and real-time updates
export function useRequests() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['requests'],
    queryFn: async (): Promise<RequestWithUser[]> => {
      const response = await fetch('/api/requests')
      if (!response.ok) {
        throw new Error('Failed to fetch requests')
      }
      const result = await response.json()
      // Handle the API response structure and deduplicate
      const requests = result.data || result
      return deduplicateRequests(requests)
    },
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  })

  // Set up real-time updates
  useEffect(() => {
    // Get the organization ID from the first request or from user context
    const orgId = query.data?.[0]?.clerkOrgId
    if (!orgId) {
      // If no requests yet, we'll set up the subscription when data loads
      return
    }

    console.log('Setting up Pusher subscription for org:', orgId)

    const channel = pusherClient.subscribe(
      PUSHER_CHANNELS.REQUEST_UPDATES(orgId)
    )

    // Listen for request updates
    channel.bind(
      PUSHER_EVENTS.REQUEST_UPDATED,
      (data: { request: RequestWithUser }) => {
        console.log('Received request update:', data.request.id)
        queryClient.setQueryData(
          ['requests'],
          (oldData: RequestWithUser[] | undefined) => {
            if (!oldData) return oldData

            // Find and update the existing request
            const existingIndex = oldData.findIndex(
              (req) => req.id === data.request.id
            )
            if (existingIndex !== -1) {
              const updatedData = [...oldData]
              updatedData[existingIndex] = data.request
              return updatedData
            }

            // If request doesn't exist, add it (this shouldn't happen for updates)
            console.warn(
              'Received update for non-existent request:',
              data.request.id
            )
            return oldData
          }
        )
      }
    )

    // Listen for new requests
    channel.bind(
      PUSHER_EVENTS.REQUEST_CREATED,
      (data: { request: RequestWithUser }) => {
        console.log('Received new request:', data.request.id)
        queryClient.setQueryData(
          ['requests'],
          (oldData: RequestWithUser[] | undefined) => {
            if (!oldData) return [data.request]

            // Check if request already exists to avoid duplicates
            const existingIndex = oldData.findIndex(
              (req) => req.id === data.request.id
            )
            if (existingIndex !== -1) {
              // Update existing request
              const updatedData = [...oldData]
              updatedData[existingIndex] = data.request
              return deduplicateRequests(updatedData)
            }

            // Add new request at the beginning and deduplicate
            const newData = [data.request, ...oldData]
            return deduplicateRequests(newData)
          }
        )
      }
    )

    return () => {
      console.log('Unsubscribing from Pusher channel:', orgId)
      pusherClient.unsubscribe(PUSHER_CHANNELS.REQUEST_UPDATES(orgId))
    }
  }, [query.data, queryClient])

  return query
}

// Fetch single request with caching and real-time updates
export function useRequest(requestId: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['request', requestId],
    queryFn: async (): Promise<RequestWithUser> => {
      const response = await fetch(`/api/requests/${requestId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch request')
      }
      const result = await response.json()
      // Handle the API response structure
      return result.data || result
    },
    enabled: !!requestId,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  })

  // Set up real-time updates for single request
  useEffect(() => {
    if (!query.data || !requestId) return

    const orgId = query.data.clerkOrgId
    if (!orgId) return

    const channel = pusherClient.subscribe(
      PUSHER_CHANNELS.REQUEST_UPDATES(orgId)
    )

    // Listen for request updates
    channel.bind(
      PUSHER_EVENTS.REQUEST_UPDATED,
      (data: { request: RequestWithUser }) => {
        if (data.request.id === requestId) {
          queryClient.setQueryData(['request', requestId], data.request)
        }
      }
    )

    return () => {
      pusherClient.unsubscribe(PUSHER_CHANNELS.REQUEST_UPDATES(orgId))
    }
  }, [query.data, requestId, queryClient])

  return query
}

// Update request status with cache invalidation
export function useUpdateRequestStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: {
      requestId: string
      status: RequestStatus
    }) => {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update request status')
      }

      return response.json()
    },
    onSuccess: (data, { requestId }) => {
      // Update the specific request in cache (this will update the details page UI)
      queryClient.setQueryData(['request', requestId], data.data)

      // Update the request in the requests list (if it exists)
      queryClient.setQueryData(
        ['requests'],
        (oldData: RequestWithUser[] | undefined) => {
          if (!oldData) {
            // Since there's no list cache, invalidate the individual request to force UI update
            queryClient.invalidateQueries({ queryKey: ['request', requestId] })
            return oldData
          }

          // Find and update the existing request
          const existingIndex = oldData.findIndex((req) => req.id === requestId)
          if (existingIndex !== -1) {
            const updatedData = [...oldData]
            updatedData[existingIndex] = {
              ...updatedData[existingIndex],
              status: data.data.status,
            }
            return updatedData
          }

          return oldData
        }
      )

      // Always invalidate the specific request to ensure UI updates
      queryClient.invalidateQueries({ queryKey: ['request', requestId] })
    },
    onError: (error) => {
      console.error('Failed to update request status:', error)
    },
  })
}

// Create new request with cache invalidation
export function useCreateRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (requestData: {
      title: string
      description: string
      category: string
      serviceType?: string
    }) => {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('Failed to create request')
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate requests list to refetch with new data
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    },
    onError: (error) => {
      console.error('Failed to create request:', error)
    },
  })
}
