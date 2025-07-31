interface RequestProgressBarProps {
  status: string
  showAnimation?: boolean
  showLabels?: boolean
  className?: string
}

export const RequestProgressBar = ({
  status,
  showAnimation = true,
  showLabels = true,
  className = '',
}: RequestProgressBarProps) => {
  const steps = [
    { key: 'SUBMITTED', label: 'Submitted' },
    { key: 'IN_PROGRESS', label: 'In Progress' },
    { key: 'REVIEWING', label: 'Reviewing' },
    { key: 'COMPLETED', label: 'Completed' },
  ]

  const getStepStyle = (stepKey: string) => {
    // Handle ACTION_REQUIRED status (red for all steps)
    if (status === 'ACTION_REQUIRED') {
      return 'bg-progress-red'
    }

    const currentIndex = steps.findIndex((s) => s.key === status)
    const stepIndex = steps.findIndex((s) => s.key === stepKey)

    if (stepIndex <= currentIndex) {
      // Use animation class only if showAnimation is true
      return showAnimation ? 'progress-animated' : 'bg-htv-green'
    }

    return 'bg-gray-200'
  }

  const getTextStyle = (stepKey: string) => {
    // Handle ACTION_REQUIRED status
    if (status === 'ACTION_REQUIRED') {
      return 'text-red-600'
    }

    const currentIndex = steps.findIndex((s) => s.key === status)
    const stepIndex = steps.findIndex((s) => s.key === stepKey)

    if (stepIndex <= currentIndex) {
      return 'text-htv-green'
    }

    return 'text-gray-400'
  }

  return (
    <div className={className}>
      <div className="h-2 flex gap-1 bg-gray-100 rounded-full p-0.5">
        {steps.map((step) => (
          <div
            key={step.key}
            className={`flex-1 rounded-full transition-all duration-300 ${getStepStyle(step.key)}`}
          />
        ))}
      </div>
      {showLabels && (
        <div className="grid grid-cols-4 gap-1 mt-3">
          {steps.map((step) => (
            <span
              key={step.key}
              className={`text-xs font-medium text-start ${getTextStyle(step.key)}`}
            >
              {step.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
