import type { TimeSchedulerActions, TimeSchedulerState } from '@/types'
import { useState } from 'react'

export const useTimeScheduler = (onTimeSelect: (time: string) => void) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showTimeSlots, setShowTimeSlots] = useState(false)

  const handleDateSelect = (day: number) => {
    const today = new Date()
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), day)

    // Don't allow past dates
    if (day < today.getDate()) return

    setSelectedDate(selectedDate)
    setShowTimeSlots(true)
  }

  const handleChangeDate = () => {
    setShowTimeSlots(false)
    onTimeSelect('') // Reset selected time when changing date
  }

  const state: TimeSchedulerState = {
    selectedDate,
    showTimeSlots,
  }

  const actions: TimeSchedulerActions = {
    handleDateSelect,
    handleChangeDate,
    setSelectedDate,
    setShowTimeSlots,
  }

  return {
    state,
    actions,
  }
}
