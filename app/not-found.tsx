import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-request-hub-bg flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-600">
            <p className="mb-4">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been moved, deleted, or you entered the wrong URL.
            </p>
            <p className="text-sm">
              Error code: <span className="font-mono">404</span>
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Button asChild>
              <Link href="/requests">Go to Requests</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
