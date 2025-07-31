'use client'

import { PUSHER_CHANNELS, pusherClient } from '@/lib/integrations/pusher'
import { useEffect, useState } from 'react'

interface UseRealTimeRequestsProps {
  clerkOrgId: string
  enabled?: boolean
}

export const useRealTimeRequests = ({
  clerkOrgId,
  enabled = true,
}: UseRealTimeRequestsProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionState, setConnectionState] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting')

  useEffect(() => {
    if (!clerkOrgId || !enabled) return

    console.log(`Connecting to Pusher for organization: ${clerkOrgId}`)

    // Reset connection state when starting
    setConnectionState('connecting')

    const channel = pusherClient.subscribe(
      PUSHER_CHANNELS.REQUEST_UPDATES(clerkOrgId)
    )

    // Connection state handlers
    const handleConnected = () => {
      setIsConnected(true)
      setConnectionState('connected')
    }

    const handleDisconnected = () => {
      setIsConnected(false)
      setConnectionState('disconnected')
    }

    const handleConnecting = () => {
      setConnectionState('connecting')
    }

    pusherClient.connection.bind('connected', handleConnected)
    pusherClient.connection.bind('disconnected', handleDisconnected)
    pusherClient.connection.bind('connecting', handleConnecting)

    // Check current connection state
    if (pusherClient.connection.state === 'connected') {
      handleConnected()
    } else if (pusherClient.connection.state === 'connecting') {
      handleConnecting()
    } else {
      handleDisconnected()
    }

    return () => {
      console.log('Cleaning up Pusher connection')
      channel.unbind_all()
      pusherClient.unsubscribe(PUSHER_CHANNELS.REQUEST_UPDATES(clerkOrgId))
      pusherClient.connection.unbind('connected', handleConnected)
      pusherClient.connection.unbind('disconnected', handleDisconnected)
      pusherClient.connection.unbind('connecting', handleConnecting)
    }
  }, [clerkOrgId, enabled])

  return {
    isConnected,
    connectionState,
    pusherClient, // Exported for debugging
  }
}
