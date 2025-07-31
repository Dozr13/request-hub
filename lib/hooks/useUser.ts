import { useUser as useClerkUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

interface UserWithAvatar {
  id: string
  name: string | null
  email: string
  imageUrl: string | null
  initials: string | null
  role: string
  companyId: string
}

export function useUserWithAvatar() {
  const { user: clerkUser, isLoaded } = useClerkUser()
  const [dbUser, setDbUser] = useState<UserWithAvatar | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (!clerkUser?.id || !isLoaded) return

      try {
        const response = await fetch(`/api/users/${clerkUser.id}`)
        if (response.ok) {
          const userData = await response.json()
          setDbUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [clerkUser?.id, isLoaded])

  return { user: dbUser, loading, isLoaded }
}

export function useUserById(userId: string) {
  const [user, setUser] = useState<UserWithAvatar | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return

      try {
        const response = await fetch(`/api/users/by-id/${userId}`)
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  return { user, loading }
}
