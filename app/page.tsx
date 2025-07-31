import { Landing } from '@/components/landing/Landing'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const { userId } = await auth()

  console.log('🏠 LANDING PAGE: userId', userId)

  if (userId) {
    redirect('/home')
  }

  return <Landing />
}
