import { getImpersonationContext } from '@/lib/auth/impersonation'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const impersonationContext = await getImpersonationContext()

    if (!impersonationContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(impersonationContext)
  } catch (error) {
    console.error('Error getting impersonation context:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
