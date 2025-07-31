'use client'

import { BUSINESS_AREAS } from '@/lib/constants/business-areas'
import { DEFAULT_USER } from '@/lib/constants/request-constants'
import {
  buildRequestPayload,
  submitRequest,
} from '@/lib/requests/request-utils'
import {
  hasFormErrors,
  validateRequestForm,
} from '@/lib/validation/form-validation'
import {
  DialogStep,
  FormErrors,
  RequestFormData,
  UserInfo,
  UserWithOrganization,
} from '@/types'
import { Priority, RequestCategory } from '@prisma/client'
import { useEffect, useState } from 'react'

export interface UseNewRequestDialogProps {
  open: boolean
  onClose: () => void
  currentUser?: UserWithOrganization
}

export function useNewRequestDialog({
  open,
  onClose,
  currentUser,
}: UseNewRequestDialogProps) {
  const [currentStep, setCurrentStep] = useState<DialogStep>('business-area')
  const [selectedBusinessArea, setSelectedBusinessArea] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState<RequestFormData>({
    businessArea: '',
    service: '',
    title: '',
    description: '',
    category: RequestCategory.HIRING,
    priority: Priority.MEDIUM,
    files: [],
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const currentBusinessArea = BUSINESS_AREAS.find(
    (area) => area.step === currentStep
  )
  const isBusinessAreaStep = currentStep === 'business-area'
  const isDetailsStep = currentStep === 'details'
  const isTimeStep = currentStep === 'time'

  // Use current user data or fall back to default user
  const user: UserInfo = currentUser
    ? {
        id: currentUser.id,
        name: currentUser.name || 'User',
        imageUrl: currentUser.imageUrl,
        role: currentUser.role,
      }
    : DEFAULT_USER

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      resetDialogState()
      // Extra clear for any lingering errors
      setFormErrors({})
      setSubmitError(null)
    }
  }, [open])

  const resetDialogState = () => {
    setCurrentStep('business-area')
    setSelectedBusinessArea('')
    setSelectedService('')
    setSelectedTime(null)
    setFormData({
      businessArea: '',
      service: '',
      title: '',
      description: '',
      category: RequestCategory.HIRING,
      priority: Priority.MEDIUM,
      files: [],
    })
    setFormErrors({})
    setSubmitError(null)
    setIsSubmitting(false)
  }

  const handleBusinessAreaClick = (step: DialogStep) => {
    const area = BUSINESS_AREAS.find((a) => a.step === step)
    if (area) {
      setSelectedBusinessArea(area.name)
      setSelectedService('')
      setFormData((prev) => ({
        ...prev,
        businessArea: area.name,
        service: '',
      }))
      setCurrentStep(step)
      setFormErrors({})
      setSubmitError(null)
    }
  }

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName)
    setFormData((prev) => ({ ...prev, service: serviceName }))
    setFormErrors({})
    setSubmitError(null)
    setCurrentStep('details')
  }

  const handleFormDataChange = (updates: Partial<RequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handleFormErrorChange = (errors: FormErrors) => {
    setFormErrors(errors)
  }

  const handleNext = () => {
    if (isDetailsStep) {
      const errors = validateRequestForm(formData)
      if (!hasFormErrors(errors)) {
        setFormErrors({})
        setSubmitError(null)
        setCurrentStep('time')
      } else {
        setFormErrors(errors)
      }
    }
  }

  const handleBack = () => {
    setFormErrors({})
    setSubmitError(null)

    if (isTimeStep) {
      setCurrentStep('details')
    } else if (isDetailsStep) {
      const currentArea = BUSINESS_AREAS.find(
        (area) => area.name === selectedBusinessArea
      )
      if (currentArea) {
        setCurrentStep(currentArea.step)
      } else {
        setCurrentStep('business-area')
      }
    } else if (!isBusinessAreaStep) {
      setCurrentStep('business-area')
      setSelectedBusinessArea('')
      setSelectedService('')
      setFormData((prev) => ({ ...prev, businessArea: '', service: '' }))
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleSubmitRequest = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const requestData = buildRequestPayload(
        formData,
        selectedBusinessArea,
        selectedService,
        selectedTime
      )

      const result = await submitRequest(requestData)

      console.log('Request created successfully:', result)

      if (result.linearTask) {
        console.log('Linear task created:', result.linearTask)
      }

      handleClose()
    } catch (error) {
      console.error('Error submitting request:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to create request'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    resetDialogState()
    onClose()
  }

  return {
    currentStep,
    selectedBusinessArea,
    selectedService,
    selectedTime,
    formData,
    formErrors,
    isSubmitting,
    submitError,
    currentBusinessArea,
    isBusinessAreaStep,
    isDetailsStep,
    isTimeStep,
    user,
    handleBusinessAreaClick,
    handleServiceClick,
    handleFormDataChange,
    handleFormErrorChange,
    handleNext,
    handleBack,
    handleTimeSelect,
    handleSubmitRequest,
    handleClose,
  }
}
