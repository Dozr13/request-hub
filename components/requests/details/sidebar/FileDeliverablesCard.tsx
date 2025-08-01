import { Button, Card, CardContent, Icon } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { FileDeliverablesCardProps } from '@/types'
import Image from 'next/image'

export const FileDeliverablesCard = ({
  className,
}: FileDeliverablesCardProps) => {
  return (
    <Card className={cn('py-4 bg-white rounded-md', className)}>
      <CardContent className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900 text-sm">
            File Deliverables
          </h3>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <Image
            src="/images/folder-green.png"
            width={80}
            height={80}
            className="mb-4"
            alt="Folder"
          />
          <p className="request-hub-body request-hub-text-secondary">
            Partner work submissions will be shown here
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
