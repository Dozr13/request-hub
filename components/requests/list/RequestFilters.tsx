import { Tabs, TabsList, TabsTrigger } from '@/components/ui'
import type { FilterType, StatusCounts } from '@/types'

interface RequestFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  statusCounts: StatusCounts
}

export const RequestFilters = ({
  activeFilter,
  onFilterChange,
  statusCounts,
}: RequestFiltersProps) => {
  return (
    <Tabs
      value={activeFilter}
      onValueChange={(value) => onFilterChange(value as FilterType)}
      className="w-fit"
    >
      <TabsList className="flex bg-gray-100 rounded-lg p-1 h-auto w-fit gap-1">
        <TabsTrigger
          value="all"
          className="whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 cursor-pointer"
          data-testid="filter-all"
        >
          All
          <span className="ml-1 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
            {statusCounts.all}
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="submitted"
          className="whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 cursor-pointer"
          data-testid="filter-submitted"
        >
          Submitted
          <span className="ml-1 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
            {statusCounts.submitted}
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="actionRequired"
          className="whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 cursor-pointer"
          data-testid="filter-action-required"
        >
          Action Required
          <span className="ml-1 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
            {statusCounts.actionRequired}
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="inProgress"
          className="whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 cursor-pointer"
          data-testid="filter-in-progress"
        >
          In Progress
          <span className="ml-1 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
            {statusCounts.inProgress}
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="reviewing"
          className="whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 cursor-pointer"
          data-testid="filter-reviewing"
        >
          Reviewing
          <span className="ml-1 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
            {statusCounts.reviewing}
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="completed"
          className="whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 cursor-pointer"
          data-testid="filter-completed"
        >
          Completed
          <span className="ml-1 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
            {statusCounts.completed}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
