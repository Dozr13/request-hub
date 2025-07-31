import { IconName } from '../ui/icons'

export const SIDEBAR_SECTIONS = [
  {
    title: 'OPERATING SYSTEM',
    items: [
      {
        iconName: 'Users' as IconName,
        label: 'Applications',
        count: 12,
        active: false,
      },
      {
        iconName: 'Users' as IconName,
        label: 'Community',
        count: 89,
        active: false,
      },
      {
        iconName: 'Building2' as IconName,
        label: 'Companies',
        count: 45,
        active: false,
      },
      {
        iconName: 'FileText' as IconName,
        label: 'Resources',
        count: 234,
        active: false,
      },
      {
        iconName: 'Shield' as IconName,
        label: 'Requests',
        count: 67,
        active: true,
      },
    ],
  },
  {
    title: 'INVESTOR PLATFORM',
    items: [
      {
        iconName: 'BarChart3' as IconName,
        label: 'Applications',
        count: 8,
        active: false,
      },
      {
        iconName: 'Users' as IconName,
        label: 'All Investors',
        count: 156,
        active: false,
      },
      {
        iconName: 'BarChart3' as IconName,
        label: 'Portfolios',
        count: 23,
        active: false,
      },
      {
        iconName: 'Settings' as IconName,
        label: 'Legal',
        count: 12,
        active: false,
      },
    ],
  },
  {
    title: 'TALENT HUB',
    items: [
      {
        iconName: 'Users' as IconName,
        label: 'Applications',
        count: 45,
        active: false,
      },
      {
        iconName: 'FileText' as IconName,
        label: 'All Job Posts',
        count: 28,
        active: false,
      },
      {
        iconName: 'Users' as IconName,
        label: 'Talent',
        count: 312,
        active: false,
      },
      {
        iconName: 'BarChart3' as IconName,
        label: 'Analytics',
        count: null,
        active: false,
      },
    ],
  },
  {
    title: 'PARTNER PORTAL',
    items: [
      {
        iconName: 'Building2' as IconName,
        label: 'Applications',
        count: 6,
        active: false,
      },
      {
        iconName: 'Users' as IconName,
        label: 'All Partners',
        count: 24,
        active: false,
      },
      {
        iconName: 'Users' as IconName,
        label: 'Engagements',
        count: 89,
        active: false,
      },
    ],
  },
  {
    title: 'COMMUNITY EVENTS',
    items: [
      {
        iconName: 'Calendar' as IconName,
        label: 'All Events',
        count: 15,
        active: false,
      },
    ],
  },
]
