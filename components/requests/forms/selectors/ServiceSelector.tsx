'use client'

import { Badge } from '@/components/ui'
import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import { IconName } from '@/lib/ui/icons'
import { BusinessAreaItem } from '@/types'
import { ChevronRight } from 'lucide-react'

interface ServiceSelectorProps {
  businessArea: BusinessAreaItem
  onServiceClick: (serviceName: string) => void
  onBack: () => void
}

export const ServiceSelector = ({
  businessArea,
  onServiceClick,
  onBack,
}: ServiceSelectorProps) => {
  if (!businessArea.services || businessArea.services.length === 0) {
    return (
      <div className="px-6 py-4 space-y-1">
        <div className="text-center py-8 text-gray-500">
          <p>No services available for this business area.</p>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Button variant="outline" onClick={onBack} className="w-auto">
            Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="px-6 py-4 space-y-1">
        {businessArea.services.map((service) => (
          <div
            key={service.name}
            onClick={() => onServiceClick(service.name)}
            className="w-full flex items-center justify-between border-0 hover:bg-gray-50 transition-all group rounded-lg cursor-pointer"
            data-testid="service-selector"
          >
            <div className="flex items-center gap-4">
              {service.icon && (
                <div className="w-12 h-12 flex items-center justify-center">
                  <Icon
                    name={service.icon as IconName}
                    className="text-gray-600"
                    size={24}
                  />
                </div>
              )}

              <div className="text-left flex-1 my-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-base">
                    {service.name}
                  </span>
                  {service.popular && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="htv-meta text-xs text-htv-text-muted">
                  {service.description}
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <Button variant="outline" onClick={onBack} className="w-auto">
          Back
        </Button>
      </div>
    </>
  )
}
