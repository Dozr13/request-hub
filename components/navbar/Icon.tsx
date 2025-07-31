import { ICON_PATHS } from '@/lib/constants'

interface IconProps {
  name: keyof typeof ICON_PATHS
  className?: string
}

export const Icon = ({ name, className = 'h-4 w-4' }: IconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={ICON_PATHS[name] || ICON_PATHS.house}
      />
    </svg>
  )
}
