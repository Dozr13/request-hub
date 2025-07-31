import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Request Hub
          </h1>
          <p className="text-muted-foreground">
            Enterprise request management platform
          </p>
        </div>

        <div className="flex justify-center">
          <SignUp
            appearance={{
              variables: {
                colorPrimary: 'hsl(var(--primary))',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
