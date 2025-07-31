import { ClientAuthenticatedLayout } from './ClientAuthenticatedLayout'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return <ClientAuthenticatedLayout>{children}</ClientAuthenticatedLayout>
}
