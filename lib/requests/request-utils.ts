import { RequestFormData } from '@/types'
import { Priority, RequestCategory } from '@prisma/client'

// Map business area names to RequestCategory enum values
const mapBusinessAreaToCategory = (businessArea: string): RequestCategory => {
  const mapping: Record<string, RequestCategory> = {
    Marketing: 'MARKETING',
    Sales: 'SALES',
    'Operations & Fulfillment': 'OPERATIONS',
    Finance: 'FINANCE',
    Product: 'PRODUCT',
    Hiring: 'HIRING',
    Capital: 'CAPITAL',
    Legal: 'LEGAL',
    Technology: 'TECHNOLOGY',
    Strategy: 'STRATEGY',
  }

  return mapping[businessArea] || 'OTHER'
}

export const buildRequestPayload = (
  formData: RequestFormData,
  selectedBusinessArea: string,
  selectedService: string,
  scheduledTime: string | null = null
) => {
  // Handle scheduledTime with proper validation
  let validScheduledTime: string

  console.log('buildRequestPayload - received scheduledTime:', scheduledTime)

  if (scheduledTime) {
    // Check if it's a HH:MM format (like "14:30")
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (timeRegex.test(scheduledTime)) {
      // Convert HH:MM format to today's date at that time
      const today = new Date()
      const [hours, minutes] = scheduledTime.split(':').map(Number)
      today.setHours(hours, minutes, 0, 0)
      validScheduledTime = today.toISOString()
      console.log(
        'Converted HH:MM to ISO:',
        scheduledTime,
        '=>',
        validScheduledTime
      )
    } else {
      // Try to parse as full date/time
      const testDate = new Date(scheduledTime)
      if (!isNaN(testDate.getTime())) {
        validScheduledTime = testDate.toISOString()
        console.log('Using provided scheduledTime:', validScheduledTime)
      } else {
        console.warn(
          'Invalid scheduledTime provided, using current time:',
          scheduledTime
        )
        validScheduledTime = new Date().toISOString()
      }
    }
  } else {
    // Default to current time
    validScheduledTime = new Date().toISOString()
    console.log(
      '📅 No scheduledTime provided, using current time:',
      validScheduledTime
    )
  }

  const payload = {
    title: formData.title,
    description: formData.description,
    businessArea: selectedBusinessArea,
    serviceType: selectedService, // Changed from 'service' to 'serviceType'
    category: mapBusinessAreaToCategory(selectedBusinessArea),
    priority: 'MEDIUM' as Priority,
    scheduledTime: validScheduledTime,
  }

  console.log('📤 Final request payload:', payload)
  return payload
}

export const submitRequest = async (
  requestData: ReturnType<typeof buildRequestPayload>
) => {
  const response = await fetch('/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create request')
  }

  return result
}
