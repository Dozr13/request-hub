'use client'

import { CustomIcons, LucideIcons, type IconName } from '@/lib/ui/icons'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

export function Icon({ name, className, size = 16 }: IconProps) {
  // Check if it's a custom icon first
  if (name in CustomIcons) {
    const CustomIconComponent = CustomIcons[name as keyof typeof CustomIcons]
    return <CustomIconComponent className={cn('', className)} size={size} />
  }

  // Fall back to Lucide icons
  const IconComponent = LucideIcons[
    name as keyof typeof LucideIcons
  ] as LucideIcon

  if (!IconComponent) {
    console.warn(
      `Icon "${name}" not found. Make sure to import it in lib/ui/icons.ts`
    )
    return null
  }

  return <IconComponent className={cn('', className)} size={size} />
}
