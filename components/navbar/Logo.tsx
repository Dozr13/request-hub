import Image from 'next/image'
import Link from 'next/link'

import requestHubLogo from '@/public/images/Request-Hub-Full-Logo.png'

export const Logo = () => {
  return (
    <Link href="/" className="flex-shrink-0">
      <Image
        src={requestHubLogo}
        alt="Request Hub Full Logo"
        width={96}
        height={24}
        className="h-6 w-auto"
        priority
        unoptimized
      />
    </Link>
  )
}
