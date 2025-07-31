import { Card, CardContent } from '@/components/ui'
import type { RequestTextCardProps } from '@/types'

export const RequestTextCard = ({ description }: RequestTextCardProps) => {
  return (
    <Card className="py-4 bg-white rounded-md">
      <CardContent className="p-4">
        <h3 className="htv-body text-sm font-medium text-htv-text-secondary mb-4">
          Request Text
        </h3>
        <p className="htv-body htv-text-secondary leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
