interface PublicLayoutProps {
  children: React.ReactNode
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div className="min-h-screen bg-request-hub-bg">{children}</div>
}
