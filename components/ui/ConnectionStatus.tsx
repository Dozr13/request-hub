import { cn } from '@/lib/utils'

interface ConnectionStatusProps {
  isConnected: boolean
  connectionState: 'connecting' | 'connected' | 'disconnected'
  className?: string
}

export const ConnectionStatus = ({
  isConnected,
  connectionState,
  className,
}: ConnectionStatusProps) => {
  const getStatusColor = () => {
    switch (connectionState) {
      case 'connected':
        return 'bg-green-500'
      case 'connecting':
        return 'bg-yellow-500'
      case 'disconnected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = () => {
    switch (connectionState) {
      case 'connected':
        return 'Live'
      case 'connecting':
        return 'Connecting...'
      case 'disconnected':
        return 'Offline'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className={cn('flex items-center gap-2 text-xs', className)}>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'h-2 w-2 rounded-full transition-colors duration-200',
            getStatusColor(),
            connectionState === 'connecting' && 'animate-pulse'
          )}
        />
        <span
          className={cn(
            'font-medium transition-colors duration-200',
            isConnected ? 'text-green-600' : 'text-gray-500'
          )}
        >
          {getStatusText()}
        </span>
      </div>
    </div>
  )
}
