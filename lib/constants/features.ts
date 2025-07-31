import { IconName } from '@/lib/ui/icons'

export interface Feature {
  icon: IconName
  title: string
  description: string
  color: string
}

export const FEATURES: Feature[] = [
  {
    icon: 'BookOpen',
    title: 'Program Module',
    description:
      'Access structured educational content, accelerator resources, and progression tracking.',
    color: 'text-blue-600',
  },
  {
    icon: 'MessageSquare',
    title: 'Request Hub',
    description:
      'Submit and manage support requests with real-time tracking and expert responses.',
    color: 'text-green-600',
  },
  {
    icon: 'Users',
    title: 'Community & Networking',
    description:
      'Engage with peer founders, share insights, and view company leaderboards.',
    color: 'text-purple-600',
  },
  {
    icon: 'UserPlus',
    title: 'Talent Acquisition',
    description:
      'Post job openings and source vetted talent tailored to your business needs.',
    color: 'text-orange-600',
  },
  {
    icon: 'Calendar',
    title: 'Communication & Advisory',
    description:
      'Schedule calls with Venture Partners and chat in real-time with HTV advisors.',
    color: 'text-pink-600',
  },
  {
    icon: 'Zap',
    title: 'Centralized Platform',
    description:
      'Replace Slack, Skool, Calendly, and Typeform with one seamless ecosystem.',
    color: 'text-indigo-600',
  },
]
