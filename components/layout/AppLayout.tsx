import { AuthenticatedLayout } from './AuthenticatedLayout'
import { PublicLayout } from './PublicLayout'

interface AppLayoutProps {
  children: React.ReactNode
  isAuthenticated?: boolean
}

export const AppLayout = ({
  children,
  isAuthenticated = false,
}: AppLayoutProps) => {
  if (isAuthenticated) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>
  }

  return <PublicLayout>{children}</PublicLayout>
}
