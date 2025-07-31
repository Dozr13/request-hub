/**
 * Avatar utility functions for generating initials and handling avatar URLs
 */

export const getUserInitials = (name?: string | null): string => {
  if (!name) return 'U'

  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const getAvatarUrl = (user: {
  imageUrl?: string | null
  name?: string | null
}): { url?: string; initials: string } => {
  const url = user.imageUrl || undefined
  const initials = getUserInitials(user.name)

  return { url, initials }
}
