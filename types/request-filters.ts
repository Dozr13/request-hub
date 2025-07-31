/**
 * Types for request filtering and status counting functionality
 */

export type FilterType =
  | 'all'
  | 'submitted'
  | 'actionRequired'
  | 'inProgress'
  | 'reviewing'
  | 'completed'

export interface StatusCounts {
  all: number
  submitted: number
  actionRequired: number
  inProgress: number
  reviewing: number
  completed: number
}
