// Created to match the icon in the Figma file as it wasn't accessible in the lucide-react library
export const CustomMegaphone = ({
  className,
  size = 16,
  ...props
}: {
  className?: string
  size?: number
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m3 11l18-5v12L3 14zm8.6 5.8a3 3 0 1 1-5.8-1.6"
    />
  </svg>
)
