'use client'

import { LoadingSkeleton } from '@/components/ui'
import { usePathname } from 'next/navigation'

export default function Loading() {
  const pathname = usePathname()

  // If we're navigating to /admin, show the admin loading immediately
  if (pathname === '/admin') {
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
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="w-96 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="w-24 h-8 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="flex items-center justify-center">
                <div
                  className="w-8 h-8 border-2 border-blue-600 border-r-transparent rounded-full animate-spin mr-3"
                  style={{ animationDuration: '2s' }}
                ></div>
                <span className="text-lg text-gray-600">
                  Loading Command Centre...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If we're navigating to /requests, show the requests-specific loading
  if (pathname === '/requests') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* "Get expert help, instantly" Section Skeleton */}
        <div className="bg-gray-900 text-white rounded-lg p-6 mb-8">
          <LoadingSkeleton
            height={32}
            width={300}
            className="mb-4 bg-gray-700"
          />
          <LoadingSkeleton
            height={16}
            width="full"
            className="mb-6 bg-gray-700"
          />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <LoadingSkeleton
                key={i}
                height={24}
                width={Math.floor(Math.random() * (120 - 60 + 1)) + 60} // Random width for tags
                className="rounded-full bg-gray-700"
              />
            ))}
          </div>
        </div>

        {/* "Create Request" Section Skeleton */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center w-48 h-32">
            <LoadingSkeleton height={48} width={48} className="mb-2 rounded" />
            <LoadingSkeleton height={20} width={120} />
          </div>
        </div>

        {/* "All Requests" Header, Filters, and Search Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          {/* "All Requests" Header */}
          <LoadingSkeleton height={28} width={180} className="mb-4 lg:mb-0" />

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-1 p-1 bg-gray-100 rounded-md">
              {Array.from({ length: 6 }).map((_, i) => (
                <LoadingSkeleton
                  key={i}
                  height={36}
                  width={i === 0 ? 80 : 120} // "All" is shorter, others longer
                  className="rounded-md"
                />
              ))}
            </div>
            {/* Search Input */}
            <LoadingSkeleton height={40} width={288} className="rounded-md" />
          </div>
        </div>

        {/* Request Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <LoadingSkeleton height={16} width={100} />
                <LoadingSkeleton
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              </div>
              <LoadingSkeleton height={24} width={250} className="mb-2" />
              <LoadingSkeleton height={16} width={200} className="mb-4" />
              <div className="flex space-x-2">
                <LoadingSkeleton height={24} width={60} className="rounded" />
                <LoadingSkeleton height={24} width={120} className="rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default Coming Soon loading screen for all other routes
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card Skeleton */}
        <div className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-lg p-12 text-center">
          {/* Icon with Animation Skeleton */}
          <div className="relative mb-8">
            <LoadingSkeleton
              height={96}
              width={96}
              className="rounded-full mx-auto bg-gradient-to-br from-blue-500 to-purple-600"
            />
            <LoadingSkeleton
              height={32}
              width={32}
              className="absolute -top-2 -right-2 rounded-full"
            />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <div>
              <LoadingSkeleton
                height={48}
                width={300}
                className="mx-auto mb-2"
              />
              <LoadingSkeleton
                height={4}
                width={96}
                className="mx-auto rounded-full"
              />
            </div>

            <LoadingSkeleton height={24} width={400} className="mx-auto" />

            {/* Expected Date Badge Skeleton */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <LoadingSkeleton
                height={16}
                width={16}
                className="mr-2 rounded"
              />
              <LoadingSkeleton height={20} width={100} className="rounded" />
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <LoadingSkeleton height={48} width={160} className="rounded" />
              <LoadingSkeleton height={48} width={140} className="rounded" />
            </div>
          </div>
        </div>

        {/* Footer Text Skeleton */}
        <div className="text-center mt-8">
          <LoadingSkeleton height={16} width={300} className="mx-auto" />
        </div>
      </div>
    </div>
  )
}
