import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import Link from 'next/link'

export const LandingHeader = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Request Hub</h1>
              <p className="text-sm text-gray-500">by HTV</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer">
                Get Started
                <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
