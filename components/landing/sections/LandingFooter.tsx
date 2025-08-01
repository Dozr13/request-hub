export const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <span className="text-xl font-bold">Request Hub</span>
        </div>
        <p className="text-gray-400 mb-4">
          Enterprise request management by Request Hub
        </p>
        <p className="text-sm text-gray-500">
          © 2025 Request Hub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
