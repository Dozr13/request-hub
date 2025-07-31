'use client'

import { pusherClient } from '@/lib/integrations/pusher'
import { createContext, useContext, useEffect, useState } from 'react'

interface PusherContextType {
  isConnected: boolean
}

const PusherContext = createContext<PusherContextType>({
  isConnected: false,
})

export const usePusher = () => useContext(PusherContext)

export function PusherProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    pusherClient.connection.bind('connected', () => {
      setIsConnected(true)
    })

    pusherClient.connection.bind('disconnected', () => {
      console.log('Pusher disconnected')
      setIsConnected(false)
    })

    pusherClient.connection.bind('error', (error: unknown) => {
      console.error('Pusher connection error:', error)
      setIsConnected(false)
    })

    return () => {
      pusherClient.disconnect()
    }
  }, [])

  return (
    <PusherContext.Provider value={{ isConnected }}>
      {children}
    </PusherContext.Provider>
  )
}
