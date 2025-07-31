'use client'

import { useEffect, useState } from 'react'
import { Icon } from './icon'

interface PerformanceIndicatorProps {
  className?: string
}

export function PerformanceIndicator({ className }: PerformanceIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [performanceMode, setPerformanceMode] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    animationCount: 0,
    fps: 0,
    domNodes: 0,
    bundleSize: 0,
  })

  // Calculate performance score
  const getPerformanceScore = () => {
    if (!performanceMode || performanceMetrics.fps === 0) return 0

    let score = 100

    // FPS scoring (60fps = 100, 30fps = 50, 15fps = 0)
    const fpsScore = Math.min(100, (performanceMetrics.fps / 60) * 100)
    score = (score + fpsScore) / 2

    // Render time scoring (16ms = 100, 33ms = 50, 100ms = 0)
    const renderScore = Math.max(
      0,
      100 - (performanceMetrics.renderTime - 16) * 2
    )
    score = (score + renderScore) / 2

    // DOM nodes scoring (less is better)
    const domScore = Math.max(0, 100 - performanceMetrics.domNodes / 100)
    score = (score + domScore) / 2

    return Math.round(score)
  }

  const [optimizations, setOptimizations] = useState({
    optimisticUpdates: true,
    caching: true,
    virtualization: false,
    lazyLoading: true,
  })

  useEffect(() => {
    // Show indicator after a delay to avoid cluttering the UI
    const timer = setTimeout(() => setIsVisible(true), 2000)

    // Check performance mode from localStorage
    const isEnabled = localStorage.getItem('performance-mode') === 'true'
    setPerformanceMode(isEnabled)

    // Apply performance mode settings
    if (isEnabled) {
      // Enable performance optimizations
      document.documentElement.classList.add('performance-mode')
    } else {
      document.documentElement.classList.remove('performance-mode')
    }

    return () => clearTimeout(timer)
  }, [performanceMode])

  useEffect(() => {
    // Detect if virtualization should be enabled based on request count
    const checkVirtualization = () => {
      const requestCards = document.querySelectorAll(
        '[data-testid="request-card"]'
      )
      setOptimizations((prev) => ({
        ...prev,
        virtualization: requestCards.length > 12,
      }))
    }

    // Measure performance metrics
    const measurePerformance = () => {
      if (performanceMode) {
        const startTime = performance.now()

        // Measure render time
        requestAnimationFrame(() => {
          const endTime = performance.now()
          setPerformanceMetrics((prev) => ({
            ...prev,
            renderTime: Math.round(endTime - startTime),
          }))
        })

        // Count animations and DOM nodes
        const animations = document.querySelectorAll('[class*="animate-"]')
        const domNodes = document.querySelectorAll('*').length

        setPerformanceMetrics((prev) => ({
          ...prev,
          animationCount: animations.length,
          domNodes: domNodes,
        }))

        // Measure FPS
        let frameCount = 0
        let lastTime = performance.now()

        const measureFPS = () => {
          frameCount++
          const currentTime = performance.now()

          if (currentTime - lastTime >= 1000) {
            setPerformanceMetrics((prev) => ({
              ...prev,
              fps: frameCount,
            }))
            frameCount = 0
            lastTime = currentTime
          }

          if (performanceMode) {
            requestAnimationFrame(measureFPS)
          }
        }

        requestAnimationFrame(measureFPS)
      }
    }

    // Check after initial load
    const timer = setTimeout(() => {
      checkVirtualization()
      measurePerformance()
    }, 1000)
    return () => clearTimeout(timer)
  }, [performanceMode])

  if (!isVisible) return null

  return (
    <>
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        {isPanelVisible ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="Zap" className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900">
                  Performance Optimizations
                </span>
              </div>
              {performanceMode && getPerformanceScore() > 0 && (
                <div
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    getPerformanceScore() >= 80
                      ? 'bg-green-100 text-green-700'
                      : getPerformanceScore() >= 60
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {getPerformanceScore()}/100
                </div>
              )}
            </div>

            <div className="space-y-1">
              {optimizations.optimisticUpdates && (
                <div className="flex items-center gap-2 text-xs">
                  <Icon name="CheckCircle" className="h-3 w-3 text-green-500" />
                  <span className="text-gray-600">Instant status updates</span>
                </div>
              )}

              {optimizations.caching && (
                <div className="flex items-center gap-2 text-xs">
                  <Icon name="Database" className="h-3 w-3 text-blue-500" />
                  <span className="text-gray-600">Smart caching</span>
                </div>
              )}

              {optimizations.virtualization && (
                <div className="flex items-center gap-2 text-xs">
                  <Icon name="Zap" className="h-3 w-3 text-purple-500" />
                  <span className="text-gray-600">Virtualized rendering</span>
                </div>
              )}

              {optimizations.lazyLoading && (
                <div className="flex items-center gap-2 text-xs">
                  <Icon name="Clock" className="h-3 w-3 text-orange-500" />
                  <span className="text-gray-600">Lazy loading</span>
                </div>
              )}

              {performanceMode && performanceMetrics.renderTime > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">FPS:</span>
                    <span
                      className={`font-medium ${
                        performanceMetrics.fps >= 60
                          ? 'text-green-600'
                          : performanceMetrics.fps >= 30
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}
                    >
                      {performanceMetrics.fps}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Render:</span>
                    <span
                      className={`font-medium ${
                        performanceMetrics.renderTime <= 16
                          ? 'text-green-600'
                          : performanceMetrics.renderTime <= 33
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}
                    >
                      {performanceMetrics.renderTime}ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">DOM Nodes:</span>
                    <span className="font-medium text-gray-700">
                      {performanceMetrics.domNodes.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Animations:</span>
                    <span className="font-medium text-gray-700">
                      {performanceMetrics.animationCount}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const newMode = !performanceMode
                    localStorage.setItem('performance-mode', newMode.toString())
                    setPerformanceMode(newMode)

                    const toast = document.createElement('div')
                    toast.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg ${
                      newMode
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`
                    toast.textContent = `Performance mode ${newMode ? 'enabled' : 'disabled'}`
                    document.body.appendChild(toast)

                    setTimeout(() => {
                      toast.style.opacity = '0'
                      toast.style.transform = 'translate(-50%, 10px)'
                      setTimeout(() => document.body.removeChild(toast), 300)
                    }, 2000)
                  }}
                  className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors cursor-pointer"
                >
                  {performanceMode ? 'Disable' : 'Enable'} Performance Mode
                </button>

                <button
                  onClick={() => setIsPanelVisible(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  title="Hide Panel"
                >
                  ×
                </button>
              </div>

              {performanceMode && (
                <button
                  onClick={() => setShowReport(true)}
                  className="w-full text-xs px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors cursor-pointer"
                >
                  View Performance Report
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsPanelVisible(true)}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
            title="Show Performance Panel"
          >
            <Icon name="Zap" className="h-4 w-4 text-green-600" />
          </button>
        )}
      </div>

      {/* Performance Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Report
              </h3>
              <button
                onClick={() => setShowReport(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 ${
                    getPerformanceScore() >= 80
                      ? 'text-green-600'
                      : getPerformanceScore() >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                >
                  {getPerformanceScore()}/100
                </div>
                <div className="text-sm text-gray-600">
                  {getPerformanceScore() >= 80
                    ? 'Excellent Performance'
                    : getPerformanceScore() >= 60
                      ? 'Good Performance'
                      : 'Needs Improvement'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500">Frame Rate</div>
                  <div
                    className={`text-lg font-semibold ${
                      performanceMetrics.fps >= 60
                        ? 'text-green-600'
                        : performanceMetrics.fps >= 30
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {performanceMetrics.fps} FPS
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500">Render Time</div>
                  <div
                    className={`text-lg font-semibold ${
                      performanceMetrics.renderTime <= 16
                        ? 'text-green-600'
                        : performanceMetrics.renderTime <= 33
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {performanceMetrics.renderTime}ms
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500">DOM Complexity</div>
                  <div className="text-lg font-semibold text-gray-700">
                    {performanceMetrics.domNodes.toLocaleString()} nodes
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500">Active Animations</div>
                  <div className="text-lg font-semibold text-gray-700">
                    {performanceMetrics.animationCount}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowReport(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
