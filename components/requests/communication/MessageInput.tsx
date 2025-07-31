'use client'

import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import { Input } from '@/components/ui'
import { useState } from 'react'

interface MessageInputProps {
  participantNames: string
  onSendMessage?: (message: string) => void
}

export const MessageInput = ({
  participantNames,
  onSendMessage,
}: MessageInputProps) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-gray-100 pt-4 mt-4 bg-white">
      <div className="px-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Plus" className="w-5 h-5 text-gray-700" />
          </div>
          <Input
            id="message-input"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${participantNames}`}
            className="w-full px-12 py-8 bg-[#F5F5F5] border border-[#EFEFEF] rounded-lg text-gray-900 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            aria-label={`Send message to ${participantNames}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-700 hover:text-gray-900"
              tabIndex={-1}
            >
              <span className="text-xs font-medium">Aa</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
