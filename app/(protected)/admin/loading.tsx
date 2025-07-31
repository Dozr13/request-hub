import { Card, CardContent } from '@/components/ui'
import { Loader2 } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div>
              <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-28 h-3 bg-gray-100 rounded animate-pulse mt-1"></div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {[1, 2, 3, 4, 5].map(section => (
            <div key={section} className="space-y-3">
              <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map(item => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-6 h-4 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-96 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-100 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-8 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <Card>
            <CardContent className="p-12">
              <div className="flex items-center justify-center">
                <Loader2
                  className="h-8 w-8 animate-spin mr-3 text-blue-600"
                  style={{ animationDuration: '2s' }}
                />
                <span className="text-lg text-gray-600">
                  Loading Command Centre...
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
