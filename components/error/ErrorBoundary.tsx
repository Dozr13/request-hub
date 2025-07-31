'use client'

import { Button, Icon } from '@/components/ui'
import type { ErrorInfo, ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const DefaultErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => (
  <div className="flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <Icon
        name="AlertTriangle"
        className="w-16 h-16 text-red-500 mx-auto mb-4"
      />
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-4">
        We apologize for the inconvenience. The application encountered an
        unexpected error.
      </p>

      {/* Show error messages in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-left">
          <p className="font-medium text-red-800">Error Details:</p>
          <p className="text-red-700 font-mono text-xs break-all">
            {error.message}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <Button onClick={resetErrorBoundary} className="w-full">
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="w-full"
        >
          Refresh Page
        </Button>
      </div>
    </div>
  </div>
)

export const ErrorBoundary = ({
  children,
  fallback,
  onError,
}: ErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.group('ErrorBoundary Error Details')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Component Stack:', errorInfo.componentStack)
    console.groupEnd()

    onError?.(error, errorInfo)
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={
        fallback ? () => <>{fallback}</> : DefaultErrorFallback
      }
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  )
}
