import { Button } from '@/components/ui'
import type { TimeSchedulerActionsProps } from '@/types'

export const TimeSchedulerActions = ({
  selectedTime,
  isSubmitting,
  submitError,
  onBack,
  onSubmit,
}: TimeSchedulerActionsProps) => {
  return (
    <div className="flex-shrink-0">
      {submitError && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-200">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}
      <div className="px-6 py-4 border-t border-gray-200 rounded-b-lg flex items-center justify-between bg-white">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!selectedTime || isSubmitting}
          className="bg-htv-green hover:bg-htv-green-hover text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating request...' : 'Schedule request'}
        </Button>
      </div>
    </div>
  )
}
