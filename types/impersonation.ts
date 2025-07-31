import type { ImpersonationUser } from './user'

export interface ImpersonationSelectorProps {
  currentUserRole: string
  isImpersonating?: boolean
  currentlyImpersonating?: ImpersonationUser
}

export interface ImpersonationState {
  users: ImpersonationUser[]
  loading: boolean
  error?: string
}
