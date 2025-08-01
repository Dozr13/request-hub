'use client'

import { Badge, Button, Icon } from '@/components/ui'
import { SIDEBAR_SECTIONS } from '@/lib/constants'
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Filter,
  Search,
  Settings,
  Shield,
} from 'lucide-react'
import { useState } from 'react'

interface AdminLayoutProps {
  children: React.ReactNode
  currentUser: {
    name: string
    email: string
    role: string
    imageUrl?: string
  }
}

export function AdminLayout({ children, currentUser }: AdminLayoutProps) {
  const [selectedClient] = useState('All Clients')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="bg-gray-50 flex">
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Command Centre
              </h1>
              <p className="text-sm text-gray-500">
                Request Hub Internal Operations
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal"
              onClick={() => {}}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{selectedClient}</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} className="p-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        name={item.iconName}
                        className={`w-4 h-4 ${item.active ? 'text-blue-600' : 'text-gray-500'}`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <Badge
                        variant={item.active ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {currentUser.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.email}
              </p>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search across platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                System Status
              </Button>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
