import { IconName } from '@/lib/ui/icons'
import { BusinessAreaItem } from '@/types'

export const BUSINESS_AREAS: BusinessAreaItem[] = [
  {
    name: 'Marketing',
    count: 9,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    icon: 'Megaphone' as IconName,
    step: 'marketing',
    services: [
      {
        name: 'PPC',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Google Ads',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Meta (Facebook/Instagram Ads)',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Ad Creative & Copy',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        popular: true,
      },
      {
        name: 'Ad Targeting Strategies',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Organic Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'YouTube Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'SEO & Content Optimization',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Newsletter & Email Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
    ],
  },
  {
    name: 'Sales',
    count: 8,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    icon: 'Briefcase' as IconName,
    step: 'sales',
    services: [
      {
        name: 'CRM Setup & Optimization',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        popular: true,
      },
      {
        name: 'Sales Process Design',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Lead Qualification',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Sales Team Training',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Sales Scripts & Playbooks',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Pipeline Management',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Sales Analytics & Reporting',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Outbound Sales Strategy',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
    ],
  },
  {
    name: 'Operations & Fulfillment',
    count: 7,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    icon: 'Package' as IconName,
    step: 'operations',
    services: [
      {
        name: 'Process Automation',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        popular: true,
      },
      {
        name: 'Inventory Management',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Supply Chain Optimization',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Quality Control Systems',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Logistics & Shipping',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Vendor Management',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Operations Analytics',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
    ],
  },
  {
    name: 'Finance & Management',
    count: 6,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    icon: 'Building2' as IconName,
    step: 'finance',
    services: [
      {
        name: 'Financial Modeling',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        popular: true,
      },
      {
        name: 'Budgeting & Forecasting',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Cash Flow Management',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Fundraising Strategy',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Accounting Setup',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        name: 'Financial Reporting',
        description: 'Lorem ipsum dolor sit amet consectetur.',
      },
    ],
  },
]
