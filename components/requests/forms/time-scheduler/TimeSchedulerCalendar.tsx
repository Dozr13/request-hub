import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import type { CalendarProps } from '@/types'

export const TimeSchedulerCalendar = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedDate,
  onDateSelect,
}: CalendarProps) => {
  // Get current date for today's indicator
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentDay = today.getDate()

  // Generate calendar days for current month
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button className="p-1 hover:bg-gray-100 rounded">
          <Icon
            name="ChevronRight"
            className="h-5 w-5 text-gray-400 rotate-180"
          />
        </Button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <Button className="p-1 hover:bg-gray-100 rounded">
          <Icon name="ChevronRight" className="h-5 w-5 text-gray-400" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week days header */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const isToday = day === currentDay
          const isPastDate = day && day < currentDay
          const isCurrentMonth = day !== null

          return (
            <div
              key={index}
              onClick={() => day && !isPastDate && onDateSelect(day)}
              className={`text-center py-2 text-sm rounded relative ${
                !isCurrentMonth
                  ? 'text-gray-300' // Previous month dates
                  : isPastDate
                    ? 'text-gray-400 cursor-not-allowed' // Past dates
                    : 'text-gray-900 hover:bg-gray-100 cursor-pointer' // Future dates
              }`}
            >
              {day || ''}
              {/* Today's indicator dot */}
              {isToday && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-request-hub-green rounded-full"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
