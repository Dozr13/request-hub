import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export function LoadingSkeleton({
  className,
  width = '100%',
  height = '1rem',
  rounded = 'md',
}: LoadingSkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        roundedClasses[rounded],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}

export function RequestCardSkeleton() {
  return (
    <div className="request-hub-card transform !shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full min-h-[280px] bg-white rounded-lg border border-gray-200">
      <div className="px-5 pt-4">
        <LoadingSkeleton height={8} className="w-full" />
      </div>

      <div className="px-5 pt-4">
        <div className="flex justify-between items-start mb-3">
          <LoadingSkeleton width={80} height={12} />
          <LoadingSkeleton width={48} height={48} rounded="full" />
        </div>

        <LoadingSkeleton height={20} className="mb-2" />
        <LoadingSkeleton height={16} className="mb-1" />
        <LoadingSkeleton height={16} className="w-3/4" />

        <div className="mt-auto pt-4">
          <div className="flex gap-2">
            <LoadingSkeleton width={60} height={20} />
            <LoadingSkeleton width={80} height={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function RequestListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <RequestCardSkeleton key={index} />
      ))}
    </div>
  )
}
