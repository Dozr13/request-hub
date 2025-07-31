'use client'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { Icon } from './icon'

interface SearchInputProps {
  placeholder?: string
  onSearch: (query: string) => void
  debounceMs?: number
  className?: string
}

export function SearchInput({
  placeholder = 'Search requests...',
  onSearch,
  debounceMs = 300,
  className,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  return (
    <div className={`relative ${className}`}>
      <Icon
        name="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5.5 w-5.5"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 bg-gray-100 border-gray-200 focus:bg-white focus:border-gray-300 h-10 text-sm"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
        >
          <Icon name="X" className="h-5.5 w-5.5" />
        </button>
      )}
    </div>
  )
}
