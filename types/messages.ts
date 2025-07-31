export interface Message {
  id: string
  sender: {
    name: string
    role: string
    avatar: string | undefined
  }
  content: string
  timestamp: Date
}

export interface ChatMessage {
  id: string
  sender: {
    name: string
    role: string
    avatar: string
  }
  content: string
  timestamp: Date
}

export interface MeetingInfo {
  title: string
  date: string
  reminder: string
}
