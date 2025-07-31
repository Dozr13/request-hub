import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'

export const NewRequestButton = () => {
  return (
    <Button
      className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 mb-3"
      size="sm"
    >
      <Icon name="Plus" className="w-6 h-6 text-white" />
    </Button>
  )
}
