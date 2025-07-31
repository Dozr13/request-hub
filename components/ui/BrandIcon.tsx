import { cn } from '@/lib/utils'
import Image from 'next/image'

interface BrandIconProps {
  name: string
  className?: string
  style?: React.CSSProperties
}

export const BrandIcon = ({ name, className, style }: BrandIconProps) => {
  // Construct the path to the icon in public/icons/
  const iconPath = `/icons/${name}.svg`

  return (
    <Image
      src={iconPath}
      alt={`${name} icon`}
      width={16}
      height={16}
      className={cn('w-4 h-4', className)}
      style={style}
      priority={false}
      onError={(e) => {
        // Fallback if icon doesn't exist
        console.warn(`Brand icon not found: ${iconPath}`)
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}
