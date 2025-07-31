import type { UserInfo } from './requests'

export interface TimeSchedulerProps {
  user: UserInfo
  selectedService: string
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string | null
}

export interface TimeSchedulerState {
  selectedDate: Date | null
  showTimeSlots: boolean
}

export interface TimeSchedulerActions {
  handleDateSelect: (day: number) => void
  handleChangeDate: () => void
  setSelectedDate: (date: Date | null) => void
  setShowTimeSlots: (show: boolean) => void
}

export interface CalendarProps {
  selectedDate: Date | null
  onDateSelect: (day: number) => void
}

export interface TimeSlotGridProps {
  selectedDate: Date | null
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  onChangeDate: () => void
}

export interface UserInfoSidebarProps {
  user: UserInfo
  selectedService: string
}

export interface TimeSchedulerActionsProps {
  selectedTime: string | null
  isSubmitting: boolean
  submitError: string | null
  onBack: () => void
  onSubmit: () => void
}
