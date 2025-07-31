import { Badge } from '@/components/ui'
import type { RequestWithUser } from '@/types'

interface RequestCardFooterProps {
  request: RequestWithUser
}

export const RequestCardFooter = ({ request }: RequestCardFooterProps) => {
  return (
    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 px-5 pb-5">
      <Badge variant="outline" className="text-xs">
        {request.priority} Priority
      </Badge>
      {request.linearUrl && (
        <a
          href={request.linearUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          View in Linear →
        </a>
      )}
    </div>
  )
}
