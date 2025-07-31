interface PublicLayoutProps {
  children: React.ReactNode
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div className="min-h-screen bg-htv-bg">{children}</div>
}
