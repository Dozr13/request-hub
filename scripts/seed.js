import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create test companies
  const techCorp = await prisma.company.upsert({
    where: { slug: 'tech-corp' },
    update: {},
    create: {
      name: 'TechCorp Inc',
      slug: 'tech-corp',
      description: 'AI-powered SaaS platform for enterprise automation',
      email: 'founders@techcorp.io',
      website: 'https://techcorp.io',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      industry: 'Enterprise Software',
      employeeCount: 25,
      founded: new Date('2022-03-15'),
      headquarters: 'San Francisco, CA',
      isActive: true,
    },
  })

  const fintech = await prisma.company.upsert({
    where: { slug: 'fintech-ventures' },
    update: {},
    create: {
      name: 'FinTech Ventures',
      slug: 'fintech-ventures',
      description: 'Next-generation financial services platform',
      email: 'team@fintechventures.com',
      website: 'https://fintechventures.com',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&fit=crop',
      industry: 'Financial Technology',
      employeeCount: 12,
      founded: new Date('2021-08-10'),
      headquarters: 'Austin, TX',
      isActive: true,
    },
  })

  const defaultCompany = await prisma.company.upsert({
    where: { slug: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'Default Company',
      slug: 'default',
      description: 'Default company for new users',
      email: 'contact@default.com',
      website: 'https://default.com',
      industry: 'Technology',
      employeeCount: 1,
      headquarters: 'Remote',
      isActive: true,
    },
  })

  console.log('Created companies:', {
    techCorp: techCorp.name,
    fintech: fintech.name,
    default: defaultCompany.name,
  })

  // Create demo users
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@htv.com' },
    update: {},
    create: {
      clerkId: 'user_demo_superadmin',
      email: 'superadmin@htv.com',
      name: 'Alex Rodriguez',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'SUPER_ADMIN',
      companyId: defaultCompany.id,
      clerkOrgId: 'org_htv_default',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@htv.com' },
    update: {},
    create: {
      clerkId: 'user_demo_admin',
      email: 'admin@htv.com',
      name: 'Mike Johnson',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      role: 'ADMIN',
      companyId: defaultCompany.id,
      clerkOrgId: 'org_htv_default',
    },
  })

  const regularUser = await prisma.user.upsert({
    where: { email: 'user@htv.com' },
    update: {},
    create: {
      clerkId: 'user_demo_regular',
      email: 'user@htv.com',
      name: 'Sarah Chen',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'USER',
      companyId: defaultCompany.id,
      clerkOrgId: 'org_htv_default',
    },
  })

  console.log('Created users:', {
    superAdmin: superAdmin.name,
    admin: admin.name,
    regularUser: regularUser.name,
  })

  // Create some sample requests
  const requests = await Promise.all([
    prisma.request.upsert({
      where: { id: 'req-1' },
      update: {},
      create: {
        id: 'req-1',
        title: 'Website Redesign',
        description:
          'Need a complete redesign of our company website with modern UI/UX principles.',
        category: 'TECHNOLOGY',
        status: 'SUBMITTED',
        priority: 'HIGH',
        userId: regularUser.id,
        companyId: defaultCompany.id,
      },
    }),
    prisma.request.upsert({
      where: { id: 'req-2' },
      update: {},
      create: {
        id: 'req-2',
        title: 'Mobile App Development',
        description:
          'Looking to develop a mobile app for iOS and Android platforms.',
        category: 'TECHNOLOGY',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        userId: admin.id,
        companyId: defaultCompany.id,
      },
    }),
    prisma.request.upsert({
      where: { id: 'req-3' },
      update: {},
      create: {
        id: 'req-3',
        title: 'Database Optimization',
        description:
          'Need help optimizing our database performance and queries.',
        category: 'TECHNOLOGY',
        status: 'COMPLETED',
        priority: 'LOW',
        userId: superAdmin.id,
        companyId: defaultCompany.id,
      },
    }),
  ])

  console.log(
    'Created requests:',
    requests.map((r) => r.title)
  )

  console.log(' Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('  Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
