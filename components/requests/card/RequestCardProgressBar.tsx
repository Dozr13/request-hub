import { getProgressBarClasses } from '@/lib/utils'
import { RequestStatus } from '@/types'

interface RequestCardProgressBarProps {
  status: RequestStatus | string
}

export const RequestCardProgressBar = ({
  status,
}: RequestCardProgressBarProps) => {
  return (
    <div className="h-2 w-full flex gap-1 px-5">
      <div className={getProgressBarClasses(status, 1)} />
      <div className={getProgressBarClasses(status, 2)} />
      <div className={getProgressBarClasses(status, 3)} />
      <div className={getProgressBarClasses(status, 4)} />
    </div>
  )
}
