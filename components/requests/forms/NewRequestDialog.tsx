'use client'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icon,
} from '@/components/ui'
import { useNewRequestDialog } from '@/lib/hooks/useNewRequestDialog'
import { NewRequestDialogProps } from '@/types'
import { BusinessAreaSelector } from './selectors/BusinessAreaSelector'
import { RequestDetailsForm } from './selectors/RequestDetailsForm'
import { ServiceSelector } from './selectors/ServiceSelector'
import { TimeScheduler } from './time-scheduler/TimeScheduler'

export const NewRequestDialog = ({
  open,
  onOpenChange,
  currentUser,
}: NewRequestDialogProps) => {
  const {
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
  } = useNewRequestDialog({
    open,
    onClose: () => onOpenChange(false),
    currentUser,
  })

  const getBreadcrumb = () => {
    const getStepClass = (step: 'business-area' | 'details' | 'time') => {
      if (
        (step === 'business-area' && isBusinessAreaStep) ||
        (step === 'business-area' &&
          !isBusinessAreaStep &&
          !isDetailsStep &&
          !isTimeStep) ||
        (step === 'details' && isDetailsStep) ||
        (step === 'time' && isTimeStep)
      ) {
        return 'font-bold text-gray-900 border-b border-gray-900'
      }
      return 'text-gray-500'
    }

    return (
      <>
        <span className={getStepClass('business-area')}>Business Area</span>
        <Icon name="ChevronRight" className="h-4 w-4" />
        <span className={getStepClass('details')}>Details</span>
        <Icon name="ChevronRight" className="h-4 w-4" />
        <span className={getStepClass('time')}>Time</span>
      </>
    )
  }

  const renderSelectedPath = () => {
    if (!selectedBusinessArea || isTimeStep) return null

    const selectedArea = currentBusinessArea
    const shouldShowService = selectedService && (isDetailsStep || isTimeStep)

    return (
      <div className="flex items-center gap-2 px-6 py-2">
        {selectedArea && (
          <Icon name={selectedArea.icon} className="text-htv-green" size={24} />
        )}
        <span className="text-sm text-htv-green font-medium">
          {selectedBusinessArea}
          {shouldShowService && ` / ${selectedService}`}
        </span>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px] w-[600px] p-0 gap-0 max-h-[calc(80vh)] border border-gray-200 shadow-2xl rounded-t-xl fixed top-[8%] left-[50%] translate-x-[-50%] translate-y-0 bg-white"
        showCloseButton={false}
        data-testid="new-request-dialog"
      >
        <DialogHeader className="rounded-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <DialogTitle className="text-lg font-semibold text-htv-text-secondary">
              New Request
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-gray-100 rounded-sm"
              onClick={handleClose}
            >
              <Icon name="X" className="h-4 w-4" />
            </Button>
          </div>

          <DialogDescription className="sr-only">
            {isBusinessAreaStep
              ? 'Select a business area to create a new request'
              : `Select a service within the ${currentBusinessArea?.name} area to create a new request`}
          </DialogDescription>

          <div className="flex items-center gap-4 text-sm text-htv-text-secondary px-6 py-3">
            {getBreadcrumb()}
          </div>

          {renderSelectedPath()}
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isBusinessAreaStep ? (
            <BusinessAreaSelector
              onBusinessAreaClick={handleBusinessAreaClick}
            />
          ) : !isDetailsStep && !isTimeStep ? (
            <ServiceSelector
              businessArea={currentBusinessArea!}
              onServiceClick={handleServiceClick}
              onBack={handleBack}
            />
          ) : isDetailsStep ? (
            <RequestDetailsForm
              formData={formData}
              formErrors={formErrors}
              onFormDataChange={handleFormDataChange}
              onFormErrorChange={handleFormErrorChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          ) : isTimeStep ? (
            <TimeScheduler
              user={user}
              selectedService={selectedService}
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
              onBack={handleBack}
              onSubmit={handleSubmitRequest}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
