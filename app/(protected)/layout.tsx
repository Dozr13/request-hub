import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
