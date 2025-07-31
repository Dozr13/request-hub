import { ChatSection } from '@/components/requests/communication/ChatSection'
import {
  Button,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import type { Message } from '@/types'

interface RequestMainContentProps {
  messages: Message[]
  participantNames: string
}

export const RequestMainContent = ({
  messages,
  participantNames,
}: RequestMainContentProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg space-y-2">
      <Tabs defaultValue="chat" className="w-full">
        <div className="relative border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <TabsList className="bg-transparent border-none rounded-none h-auto p-0 w-fit justify-start">
            <TabsTrigger
              value="chat"
              className="relative border-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 py-2 px-0 text-sm font-medium bg-transparent rounded-none shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-500 hover:text-gray-700 mr-8 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-gray-900 flex items-center gap-2 cursor-pointer"
            >
              <Icon name="MessageCircle" className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="relative border-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 py-2 px-0 text-sm font-medium bg-transparent rounded-none shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-500 hover:text-gray-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-gray-900 flex items-center gap-2"
            >
              <Icon name="FileText" className="h-4 w-4" />
              Files
            </TabsTrigger>
          </TabsList>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer ease-in-out"
          >
            <Icon name="Search" className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="chat" className="p-3">
          <ChatSection
            messages={messages}
            participantNames={participantNames}
          />
        </TabsContent>

        <TabsContent value="files" className="p-3">
          <div className="text-center py-6 text-gray-500">
            <p>Files area - to be implemented</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
