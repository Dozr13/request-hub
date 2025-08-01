import { Button } from '@/components/ui'
import type { TimeSlotGridProps } from '@/types'

export const TimeSlotGrid = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  onChangeDate,
}: TimeSlotGridProps) => {
  // TODO: Move as well to lib/constants/time-slots.ts
  const timeSlots = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ]

  return (
    <div className="space-y-6">
      {/* Date Header with Change Date */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDate?.toLocaleDateString('en-US', {
              weekday: 'long',
            })}
          </h3>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedDate?.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </h2>
        </div>
        <Button
          onClick={onChangeDate}
          className="text-sm text-request-hub-green hover:text-request-hub-green-hover font-medium"
        >
          Change date
        </Button>
      </div>

      {/* Time Selection */}
      <div>
        <p className="text-gray-700 mb-3 request-hub-meta">Select a time</p>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time
            return (
              <Button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`p-3 border rounded-lg transition-colors text-center ${
                  isSelected
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {time}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
