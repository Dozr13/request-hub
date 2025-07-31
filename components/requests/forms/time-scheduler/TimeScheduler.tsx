'use client'

import { useTimeScheduler } from '@/lib/hooks/useTimeScheduler'
import type { TimeSchedulerProps } from '@/types'
import { TimeSchedulerActions } from './TimeSchedulerActions'
import { TimeSchedulerCalendar } from './TimeSchedulerCalendar'
import { TimeSlotGrid } from './TimeSlotGrid'
import { UserInfoSidebar } from './UserInfoSidebar'

export const TimeScheduler = ({
  user,
  selectedService,
  selectedTime,
  onTimeSelect,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}: TimeSchedulerProps) => {
  const { state, actions } = useTimeScheduler(onTimeSelect)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto flex animate-content-slide-in">
        {/* I was not 100% clear on the user prop, but I think it's the user that is logged in */}
        <UserInfoSidebar user={user} selectedService={selectedService} />

        <div className="flex-1 p-4">
          {!state.showTimeSlots ? (
            <TimeSchedulerCalendar
              selectedDate={state.selectedDate}
              onDateSelect={actions.handleDateSelect}
            />
          ) : (
            <TimeSlotGrid
              selectedDate={state.selectedDate}
              selectedTime={selectedTime}
              onTimeSelect={onTimeSelect}
              onChangeDate={actions.handleChangeDate}
            />
          )}
        </div>
      </div>

      <TimeSchedulerActions
        selectedTime={selectedTime}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onBack={onBack}
        onSubmit={onSubmit}
      />
    </div>
  )
}
