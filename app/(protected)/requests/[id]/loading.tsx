import { LoadingSkeleton } from '@/components/ui'

export default function RequestDetailsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <LoadingSkeleton height={40} width={40} className="rounded-full" />
            <div>
              <LoadingSkeleton height={24} width={200} className="mb-2" />
              <LoadingSkeleton height={16} width={150} />
            </div>
          </div>
          <div className="flex space-x-2">
            <LoadingSkeleton height={32} width={80} className="rounded" />
            <LoadingSkeleton height={32} width={100} className="rounded" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content Area (Left - Chat Interface) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress Bar */}
          <LoadingSkeleton height={8} width="full" className="rounded" />

          {/* Chat Messages */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            {/* Chat Header */}
            <div className="flex items-center space-x-2 mb-6">
              <LoadingSkeleton height={32} width={60} className="rounded" />
              <LoadingSkeleton height={32} width={60} className="rounded" />
            </div>

            {/* Message Bubbles */}
            <div className="space-y-4">
              {/* Client Message */}
              <div className="flex items-start space-x-3">
                <LoadingSkeleton
                  height={32}
                  width={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <LoadingSkeleton height={16} width={120} />
                    <LoadingSkeleton height={12} width={60} />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <LoadingSkeleton height={16} width="80%" className="mb-2" />
                    <LoadingSkeleton height={16} width="60%" />
                  </div>
                </div>
              </div>

              {/* Expert Message */}
              <div className="flex items-start space-x-3 justify-end">
                <div className="flex-1 text-right">
                  <div className="flex items-center space-x-2 mb-2 justify-end">
                    <LoadingSkeleton height={16} width={120} />
                    <LoadingSkeleton height={12} width={60} />
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3 inline-block">
                    <LoadingSkeleton height={16} width="70%" className="mb-2" />
                    <LoadingSkeleton height={16} width="50%" />
                  </div>
                </div>
                <LoadingSkeleton
                  height={32}
                  width={32}
                  className="rounded-full"
                />
              </div>

              {/* Another Client Message */}
              <div className="flex items-start space-x-3">
                <LoadingSkeleton
                  height={32}
                  width={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <LoadingSkeleton height={16} width={120} />
                    <LoadingSkeleton height={12} width={60} />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <LoadingSkeleton height={16} width="90%" />
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="mt-6">
              <LoadingSkeleton
                height={48}
                width="full"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-4">
          {/* Meeting Card */}
          <div className="bg-white rounded-lg border p-4">
            <LoadingSkeleton height={20} width={200} className="mb-3" />
            <LoadingSkeleton height={16} width={150} className="mb-4" />
            <div className="space-y-2">
              <LoadingSkeleton height={32} width="full" className="rounded" />
              <LoadingSkeleton height={32} width="full" className="rounded" />
              <LoadingSkeleton height={32} width="full" className="rounded" />
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-lg border p-4">
            <LoadingSkeleton height={20} width={100} className="mb-3" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <LoadingSkeleton height={16} width={80} />
                <LoadingSkeleton height={16} width={100} />
              </div>
              <div className="flex justify-between">
                <LoadingSkeleton height={16} width={100} />
                <LoadingSkeleton height={16} width={80} />
              </div>
              <div className="flex justify-between">
                <LoadingSkeleton height={16} width={100} />
                <LoadingSkeleton height={16} width={120} />
              </div>
              <div className="flex justify-between">
                <LoadingSkeleton height={16} width={80} />
                <LoadingSkeleton height={16} width={100} />
              </div>
              <div className="flex justify-between">
                <LoadingSkeleton height={16} width={90} />
                <LoadingSkeleton height={16} width={140} />
              </div>
            </div>
          </div>

          {/* File Deliverables Card */}
          <div className="bg-white rounded-lg border p-4">
            <LoadingSkeleton height={20} width={150} className="mb-3" />
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <LoadingSkeleton
                  height={48}
                  width={48}
                  className="rounded mx-auto mb-2"
                />
                <LoadingSkeleton height={16} width={200} />
              </div>
            </div>
          </div>

          {/* Request Text Card */}
          <div className="bg-white rounded-lg border p-4">
            <LoadingSkeleton height={20} width={120} className="mb-3" />
            <LoadingSkeleton height={16} width="full" className="mb-2" />
            <LoadingSkeleton height={16} width="80%" />
          </div>
        </div>
      </div>
    </div>
  )
}
