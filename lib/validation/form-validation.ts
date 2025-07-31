import { FORM_VALIDATION } from '@/lib/constants/request-constants'
import { FormErrors, RequestFormData } from '@/types'

export const validateRequestForm = (formData: RequestFormData): FormErrors => {
  const errors: FormErrors = {}

  if (FORM_VALIDATION.TITLE_REQUIRED && !formData.title.trim()) {
    errors.title = 'Request title is required'
  }

  if (FORM_VALIDATION.DESCRIPTION_REQUIRED && !formData.description.trim()) {
    errors.description = 'Request description is required'
  } else if (
    formData.description.trim().length < FORM_VALIDATION.MIN_DESCRIPTION_LENGTH
  ) {
    errors.description = `Request description must be at least ${FORM_VALIDATION.MIN_DESCRIPTION_LENGTH} characters`
  }

  return errors
}

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0
}
