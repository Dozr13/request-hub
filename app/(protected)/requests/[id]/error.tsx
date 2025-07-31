'use client'

import { Button } from '@/components/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Icon } from '@/components/ui'
import { ErrorProps } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

export default function RequestDetailsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Request details error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-htv-bg flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Icon name="AlertTriangle" className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Unable to Load Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-600">
            <p className="mb-4">
              We couldn&apos;t load the request details. This might be due to a
              network issue or the request may have been deleted.
            </p>
            {error.digest && (
              <p className="text-sm">
                Error ID: <span className="font-mono">{error.digest}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <Button onClick={reset} className="flex items-center gap-2">
              <Icon name="RefreshCw" className="h-4 w-4" />
              Try Again
            </Button>

            <Button variant="outline" asChild>
              <Link href="/requests" className="flex items-center gap-2">
                <Icon name="ArrowLeft" className="h-4 w-4" />
                Back to Requests
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
