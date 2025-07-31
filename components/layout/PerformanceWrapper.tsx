'use client'

import { PerformanceIndicator } from '@/components/ui'

interface PerformanceWrapperProps {
  children: React.ReactNode
}

export function PerformanceWrapper({ children }: PerformanceWrapperProps) {
  return (
    <>
      {children}
      <PerformanceIndicator />
    </>
  )
}
