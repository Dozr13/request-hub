import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function for merging Tailwind CSS classes with clsx
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
