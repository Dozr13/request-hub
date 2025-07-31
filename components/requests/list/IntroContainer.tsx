'use client'

import { BrandIcon } from '@/components/ui'
import { Icon } from '@/components/ui'
import { SERVICE_CATEGORIES } from '@/lib/constants/service-categories'
import { IconName } from '@/lib/ui/icons'
import Image from 'next/image'

export const IntroContainer = () => {
  return (
    <div className="w-full flex rounded-xl px-8 lg:px-12 py-4 lg:py-10 text-white relative overflow-hidden">
      {/* Next.js Image Background */}
      <Image
        src="/images/banner-background.png"
        alt="Banner background"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />

      {/* Content */}
      <div className="relative flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1 px-4">
          <h1 className="text-xl lg:text-3xl mb-2 font-bold leading-tight drop-shadow-lg">
            Get expert help, instantly
          </h1>
          <p className="text-gray-300 text-sm font-semibold leading-relaxed max-w-xl drop-shadow-md">
            Rapidly pinpoint bottlenecks, schedule a targeted advisory session
            with our subject matter experts, and drive decisive improvements in
            your business performance.
          </p>
        </div>

        {/* Service Categories - Side by side with text */}
        <div className="mt-6 lg:mt-0 relative hidden lg:block">
          <div className="flex flex-col gap-2">
            {SERVICE_CATEGORIES.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex gap-2 ${
                  rowIndex === 0
                    ? 'justify-end'
                    : rowIndex === 1
                      ? 'justify-center ml-8'
                      : 'justify-start ml-[63px]'
                }`}
              >
                {row.map((service, index) => {
                  const hasIcon = service.icon !== undefined
                  const isBrandIcon = hasIcon && service.type === 'brand'
                  const isLucideIcon =
                    hasIcon && (service.type === 'lucide' || !service.type)

                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.04] rounded-[37px] text-white text-xs font-medium whitespace-nowrap transition-all hover:bg-white/[0.06] hover:border-white/[0.08] cursor-pointer"
                    >
                      {isBrandIcon && (
                        <BrandIcon
                          name={service.icon as string}
                          className="w-3 h-3"
                          style={{
                            filter: `hue-rotate(0deg) saturate(1) brightness(1)`,
                          }}
                        />
                      )}

                      {isLucideIcon &&
                        (() => {
                          const IconComponent = service.icon as IconName
                          return (
                            <Icon name={IconComponent} className="w-3 h-3" />
                          )
                        })()}

                      <span className="text-white text-xs font-semibold whitespace-nowrap">
                        {service.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
