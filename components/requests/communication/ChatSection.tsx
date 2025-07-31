'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { Button } from '@/components/ui'
import type { Message } from '@/types'
import { Icon } from '../../ui/icon'
import { MessageInput } from './MessageInput'

interface ChatSectionProps {
  messages: Message[]
  participantNames: string
}

export const ChatSection = ({
  messages,
  participantNames,
}: ChatSectionProps) => {
  const handleSendMessage = (message: string) => {
    // TODO: Implement message sending functionality
    console.log('Sending message:', message)
  }

  return (
    <div>
      <div className="space-y-3 mb-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.sender.avatar || undefined} />
              <AvatarFallback>
                {message.sender.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">
                  {message.sender.name}
                </span>
                <span className="text-xs text-gray-500">
                  - {message.sender.role}
                </span>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-auto"
                >
                  <Icon name="MoreHorizontal" className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput
        participantNames={participantNames}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}
