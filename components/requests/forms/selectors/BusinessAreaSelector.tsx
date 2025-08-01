'use client'

import { Icon } from '@/components/ui'
import { BUSINESS_AREAS } from '@/lib/constants/business-areas'
import { IconName } from '@/lib/ui/icons'
import { DialogStep } from '@/types'

interface BusinessAreaSelectorProps {
  onBusinessAreaClick: (step: DialogStep) => void
}

export const BusinessAreaSelector = ({
  onBusinessAreaClick,
}: BusinessAreaSelectorProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mt-4 mb-4 animate-content-slide-in">
        {BUSINESS_AREAS.map((area) => (
          <div
            key={area.name}
            onClick={() => onBusinessAreaClick(area.step)}
            className="w-full flex items-center justify-between border-0 hover:bg-gray-50 transition-all group rounded-lg cursor-pointer px-4 py-1"
            data-testid="business-area-selector"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Icon
                  name={area.icon as IconName}
                  className="text-gray-600"
                  size={24}
                />
              </div>

              <div className="text-left flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900 text-base">
                    {area.name}
                  </span>
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 text-request-hub-green text-xs border border-request-hub-green font-medium rounded-full px-1.5">
                    {area.count}
                  </span>
                </div>
                <p className="text-sm text-request-hub-text-secondary mt-0.5">
                  {area.description}
                </p>
              </div>
            </div>

            <Icon
              name="ChevronRight"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
