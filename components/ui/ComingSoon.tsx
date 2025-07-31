'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import Link from 'next/link'

interface ComingSoonProps {
  title: string
  description?: string
  expectedDate?: string
}

export function ComingSoon({
  title,
  description = "We're working hard to bring you something amazing.",
  expectedDate = 'Coming Soon',
}: ComingSoonProps) {
  return (
    <div className="h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Link href="/home">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 p-0"
            >
              <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="relative mb-6">
              <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Icon
                  name="Clock"
                  className="h-10 w-10 md:h-12 md:w-12 text-white"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <Icon
                  name="Sparkles"
                  className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 animate-pulse"
                />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
                <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              </div>

              <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                {description}
              </p>
              <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <Icon name="Clock" className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-sm md:text-base text-blue-800 font-medium">
                  {expectedDate}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6">
                <Link href="/requests">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg cursor-pointer w-full sm:w-auto"
                  >
                    Explore Requests
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                >
                  Get Notified
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Meanwhile, check out our request management system
          </p>
        </div>
      </div>
    </div>
  )
}
