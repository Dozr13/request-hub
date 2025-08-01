'use client'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface RequestWithUser {
  id: string
  title: string
  description: string | null
  status: string
  category: string
  priority: string
  clerkOrgId: string
  createdAt: string
  companyName: string
  user: {
    id: string
    name: string | null
    email: string
    imageUrl: string | null
    role: string
  }
}

interface AdminRequestsViewProps {
  userRole: string
}

export function AdminRequestsView({ userRole }: AdminRequestsViewProps) {
  const [requests, setRequests] = useState<RequestWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [companyFilter, setCompanyFilter] = useState<string>('all')
  const [totalCount, setTotalCount] = useState(0)

  const fetchRequests = async (company?: string) => {
    try {
      setLoading(true)
      const url = new URL('/api/admin/requests', window.location.origin)
      if (company && company !== 'all') {
        url.searchParams.set('company', company)
      }

      const response = await fetch(url.toString())
      if (!response.ok) throw new Error('Failed to fetch requests')

      const data = await response.json()
      setRequests(data.requests)
      setTotalCount(data.totalCount)
    } catch (error) {
      console.error('Error fetching admin requests:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests(companyFilter)
  }, [companyFilter])

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      // Refresh the requests
      fetchRequests(companyFilter)
    } catch (error) {
      console.error('Error updating request status:', error)
    }
  }

  if (!['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Access denied. Admin privileges required.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with filtering */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Requests (Cross-Tenant View)</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Manage requests across all companies • {totalCount} total
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="org_30PWBDe4wjMYWRsf7l0QcGhjKLQ">
                    TechCorp
                  </SelectItem>
                  <SelectItem value="org_30PWEbUNmjCn9L5QsTl0NdjsJGB">
                    FinTech
                  </SelectItem>
                  <SelectItem value="org_30PWICTi4Lu915bIrd0Ww2nxI7U">
                    Request Hub Admin
                  </SelectItem>
                  <SelectItem value="org_30P9yxXysREHXm7vf5XhoGQ0K6u">
                    E2E Test
                  </SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-xs">
                Admin View
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-12">
              <div className="flex items-center justify-center">
                <Loader2
                  className="h-6 w-6 animate-spin mr-2"
                  style={{ animationDuration: '2s' }}
                />
                <span>Loading requests...</span>
              </div>
            </CardContent>
          </Card>
        ) : requests.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <p className="text-gray-500">
                  {companyFilter === 'all'
                    ? 'No requests found across all companies.'
                    : `No requests found for the selected company.`}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{request.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {request.companyName}
                      </Badge>
                      <Badge
                        variant={
                          request.status === 'COMPLETED'
                            ? 'default'
                            : request.status === 'IN_PROGRESS'
                              ? 'secondary'
                              : request.status === 'REVIEWING'
                                ? 'destructive'
                                : 'outline'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {request.description || 'No description provided'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 {request.user.name || request.user.email}</span>
                      <span>📂 {request.category}</span>
                      <span>{request.priority}</span>
                      <span>
                        📅 {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusUpdate(request.id, 'IN_PROGRESS')
                      }
                      disabled={request.status === 'IN_PROGRESS'}
                    >
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusUpdate(request.id, 'COMPLETED')
                      }
                      disabled={request.status === 'COMPLETED'}
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
