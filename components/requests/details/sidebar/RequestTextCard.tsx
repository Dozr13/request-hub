import { Card, CardContent } from '@/components/ui'
import type { RequestTextCardProps } from '@/types'

export const RequestTextCard = ({ description }: RequestTextCardProps) => {
  return (
    <Card className="py-4 bg-white rounded-md">
      <CardContent className="p-4">
        <h3 className="request-hub-body text-sm font-medium text-request-hub-text-secondary mb-4">
          Request Text
        </h3>
        <p className="request-hub-body request-hub-text-secondary leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
