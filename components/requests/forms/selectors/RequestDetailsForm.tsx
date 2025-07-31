'use client'

import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { FormErrors, RequestFormData } from '@/types'

interface RequestDetailsFormProps {
  formData: RequestFormData
  formErrors: FormErrors
  onFormDataChange: (updates: Partial<RequestFormData>) => void
  onFormErrorChange: (errors: FormErrors) => void
  onBack: () => void
  onNext: () => void
}

// const CATEGORIES = [
//   { value: RequestCategory.HIRING, label: 'Hiring', description: 'Talent acquisition, recruiting' },
//   { value: RequestCategory.SALES, label: 'Sales', description: 'Customer acquisition, sales process' },
//   { value: RequestCategory.PRODUCT, label: 'Product', description: 'Product development, features' },
//   { value: RequestCategory.CAPITAL, label: 'Capital', description: 'Fundraising, financial strategy' },
//   { value: RequestCategory.MARKETING, label: 'Marketing', description: 'Marketing campaigns, brand strategy' },
//   { value: RequestCategory.OPERATIONS, label: 'Operations', description: 'Operations optimization, fulfillment' },
//   { value: RequestCategory.FINANCE, label: 'Finance', description: 'Financial planning, accounting' },
//   { value: RequestCategory.LEGAL, label: 'Legal', description: 'Legal support, compliance' },
//   { value: RequestCategory.TECHNOLOGY, label: 'Technology', description: 'Technical development, infrastructure' },
//   { value: RequestCategory.STRATEGY, label: 'Strategy', description: 'Business strategy, consulting' },
//   { value: RequestCategory.OTHER, label: 'Other', description: 'Miscellaneous requests' },
// ]

// const PRIORITIES = [
//   { value: Priority.LOW, label: 'Low', color: 'bg-gray-100 text-gray-800' },
//   { value: Priority.MEDIUM, label: 'Medium', color: 'bg-blue-100 text-blue-800' },
//   { value: Priority.HIGH, label: 'High', color: 'bg-orange-100 text-orange-800' },
//   { value: Priority.URGENT, label: 'Urgent', color: 'bg-red-100 text-red-800' },
// ]

export const RequestDetailsForm = ({
  formData,
  formErrors,
  onFormDataChange,
  onFormErrorChange,
  onBack,
  onNext,
}: RequestDetailsFormProps) => {
  const handleFieldChange = (field: keyof RequestFormData, value: string) => {
    onFormDataChange({ [field]: value })

    // Clear specific field error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      onFormErrorChange({ ...formErrors, [field]: undefined })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 animate-content-slide-in">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Request title <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Enter a short title that describes this request..."
            className={`w-full ${formErrors.title ? 'border-red-500 focus:border-red-500' : ''}`}
            data-testid="request-title"
          />
          {formErrors.title && (
            <p className="text-sm text-red-500">{formErrors.title}</p>
          )}
        </div>

        {/* Category Selection - Commented Out
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((category) => (
              <div
                key={category.value}
                onClick={() => handleFieldChange('category', category.value)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-htv-green ${
                  formData.category === category.value
                    ? 'border-htv-green bg-htv-green/5'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${formErrors.category ? 'border-red-500' : ''}`}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">
                    {category.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {formErrors.category && (
            <p className="text-sm text-red-500">{formErrors.category}</p>
          )}
        </div>
        */}

        {/* Priority Selection - Commented Out
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {PRIORITIES.map((priority) => (
              <div
                key={priority.value}
                onClick={() => handleFieldChange('priority', priority.value)}
                className={`px-4 py-2 border rounded-lg cursor-pointer transition-all ${
                  formData.priority === priority.value
                    ? 'border-htv-green bg-htv-green/5'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${formErrors.priority ? 'border-red-500' : ''}`}
              >
                <Badge className={priority.color}>{priority.label}</Badge>
              </div>
            ))}
          </div>
          {formErrors.priority && (
            <p className="text-sm text-red-500">{formErrors.priority}</p>
          )}
        </div>
        */}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Request description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Textarea
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Enter details about your request..."
              className={`w-full min-h-[120px] resize-none ${formErrors.description ? 'border-red-500 focus:border-red-500' : ''}`}
              maxLength={1000}
              data-testid="request-description"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formData.description.length}/1000
            </div>
          </div>
          {formErrors.description && (
            <p className="text-sm text-red-500">{formErrors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Attach files
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Icon
              name="Upload"
              className="h-8 w-8 text-gray-400 mx-auto mb-3"
            />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">
                Drag & drop files
              </p>
              <p className="text-xs text-gray-500">or, click to browse</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                // TODO: Implement file selection
                console.log('File selection clicked')
              }}
            >
              Select Files
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 rounded-b-lg flex items-center justify-between bg-white">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-htv-green hover:bg-htv-green-hover text-white"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
