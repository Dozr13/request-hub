import { ServiceCategory } from '@/types'

export const SERVICE_CATEGORIES: ServiceCategory[][] = [
  // Row 1
  [
    { name: 'Google Ads', color: '#4285f4', icon: 'Google', type: 'brand' },
    { name: 'Hubspot', color: '#ff7a59', icon: 'Hubspot', type: 'brand' },
    {
      name: 'Facebook Ads',
      color: '#1877f2',
      icon: 'Facebook',
      type: 'brand',
    },
    { name: 'Sales', color: '#22c55e', icon: 'Sales', type: 'brand' },
    { name: 'Product', color: '#a855f7' }, // No icon needed
  ],
  // Row 2
  [
    { name: 'Finance', color: '#10b981', icon: 'Finance', type: 'brand' },
    { name: 'Legal', color: '#ef4444', icon: 'DocuSign', type: 'brand' },
    { name: 'Design', color: '#ec4899', icon: 'Figma', type: 'brand' },
    { name: 'Talent', color: '#0a66c2', icon: 'Linkedin', type: 'brand' },
    {
      name: 'Engineering',
      color: '#64748b',
      icon: 'git',
      type: 'brand',
    },
  ],
  // Row 3
  [
    { name: 'Webflow', color: '#4353ff', icon: 'Webflow', type: 'brand' },
    {
      name: 'Fulfillment',
      color: '#16a34a',
      // No icon or type needed
    },
    { name: 'Management', color: '#ea580c', icon: 'Slack', type: 'brand' },
    { name: 'Operations', color: '#7c3aed' }, // No icon needed
  ],
]
