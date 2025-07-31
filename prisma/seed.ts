import { Priority, PrismaClient, RequestCategory } from '@prisma/client'

const prisma = new PrismaClient()

// Real Clerk organization IDs
const COMPANY_A_ORG_ID = 'org_30PvahD9FHCjj5IFVMnSysEsV30'
const COMPANY_B_ORG_ID = 'org_30PvcO365gTKpzmMpQHBo50R1W4'
const HTV_ADMIN_ORG_ID = 'org_30PwjZv2H122Iwedn8tDlyJKgJv'
const E2E_TEST_ORG_ID = 'org_30PwkcNxy1jTEF8bg8sU8Fk8ySZ'

async function main() {
  console.log('Starting multi-tenant database seed for dev test...')

  // Create organizations
  console.log('Creating test organizations...')
  const organizations = await Promise.all([
    // Company A - TechCorp
    prisma.organizationMeta.upsert({
      where: { clerkOrgId: COMPANY_A_ORG_ID },
      update: {},
      create: {
        clerkOrgId: COMPANY_A_ORG_ID,
        onboardingComplete: true,
      },
    }),
    // Company B - FinTech
    prisma.organizationMeta.upsert({
      where: { clerkOrgId: COMPANY_B_ORG_ID },
      update: {},
      create: {
        clerkOrgId: COMPANY_B_ORG_ID,
        onboardingComplete: true,
      },
    }),
    // HTV Admin org
    prisma.organizationMeta.upsert({
      where: { clerkOrgId: HTV_ADMIN_ORG_ID },
      update: {},
      create: {
        clerkOrgId: HTV_ADMIN_ORG_ID,
        onboardingComplete: true,
      },
    }),
    // E2E Test Org
    prisma.organizationMeta.upsert({
      where: { clerkOrgId: E2E_TEST_ORG_ID },
      update: {},
      create: {
        clerkOrgId: E2E_TEST_ORG_ID,
        onboardingComplete: true,
      },
    }),
  ])
  console.log('Organizations created:', organizations.length)

  // Create HTV Super Admins (can see across all companies)
  console.log('Creating HTV Super Admins...')
  const htvAdmins = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@highticketventures.com' },
      update: {},
      create: {
        clerkId: 'user_htv_admin_sarah',
        email: 'admin@highticketventures.com',
        name: 'Sarah Williams',
        role: 'SUPER_ADMIN',
        clerkOrgId: HTV_ADMIN_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
    }),
  ])
  console.log('HTV Admins created:', htvAdmins.length)

  // Create Company A (TechCorp) users
  console.log('Creating TechCorp users...')
  const techCorpUsers = await Promise.all([
    // Founder/Admin
    prisma.user.upsert({
      where: { email: 'alex@techcorp.com' },
      update: {},
      create: {
        clerkId: 'user_techcorp_alex',
        email: 'alex@techcorp.com',
        name: 'Alex Rodriguez',
        role: 'ADMIN',
        clerkOrgId: COMPANY_A_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
    }),
    // Employee
    prisma.user.upsert({
      where: { email: 'david@techcorp.com' },
      update: {},
      create: {
        clerkId: 'user_techcorp_david',
        email: 'david@techcorp.com',
        name: 'David Kim',
        role: 'USER',
        clerkOrgId: COMPANY_A_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      },
    }),
  ])
  console.log('TechCorp users created:', techCorpUsers.length)

  // Create E2E Test Users for the org_test_e2e organization
  console.log('Creating E2E Test users...')
  const e2eUsers = await Promise.all([
    // E2E Test User (using environment variable)
    prisma.user.upsert({
      where: { email: 'test.user@company1.com' },
      update: {},
      create: {
        clerkId: 'user_30PA7gDftNFcvOEYG5hbaOnAGXk',
        email: 'test.user@company1.com',
        name: 'Test User',
        role: 'USER',
        clerkOrgId: E2E_TEST_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
    }),

    // E2E Test Admin (using environment variable)
    prisma.user.upsert({
      where: { email: 'test.admin@company1.com' },
      update: {},
      create: {
        clerkId: 'user_30PAAlyeloPB7FYjIr46vfszyYz',
        email: 'test.admin@company1.com',
        name: 'Test Admin',
        role: 'ADMIN',
        clerkOrgId: E2E_TEST_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      },
    }),
  ])
  console.log('E2E Test users created:', e2eUsers.length)

  // Create Company B (FinTech) users
  console.log('Creating FinTech users...')
  const finTechUsers = await Promise.all([
    // Founder/Admin
    prisma.user.upsert({
      where: { email: 'emma@fintech.com' },
      update: {},
      create: {
        clerkId: 'user_fintech_emma',
        email: 'emma@fintech.com',
        name: 'Emma Thompson',
        role: 'ADMIN',
        clerkOrgId: COMPANY_B_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
    }),
    // Employee
    prisma.user.upsert({
      where: { email: 'lisa@fintech.com' },
      update: {},
      create: {
        clerkId: 'user_fintech_lisa',
        email: 'lisa@fintech.com',
        name: 'Lisa Wang',
        role: 'USER',
        clerkOrgId: COMPANY_B_ORG_ID,
        imageUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      },
    }),
  ])
  console.log('FinTech users created:', finTechUsers.length)

  // Create requests for Company A (TechCorp)
  console.log('Creating TechCorp requests...')
  const techCorpRequests = await Promise.all([
    prisma.request.create({
      data: {
        title: 'Need technical co-founder for AI startup',
        description:
          'Looking for a technical co-founder with ML/AI expertise to join our SaaS platform.',
        category: RequestCategory.HIRING,
        priority: Priority.HIGH,
        status: 'SUBMITTED',
        businessArea: 'SaaS',
        serviceType: 'Co-founder Search',
        clerkOrgId: COMPANY_A_ORG_ID,
        userId: techCorpUsers[0].id, // Alex
        dueDate: new Date('2024-04-15T10:00:00Z'),
      },
    }),
    prisma.request.create({
      data: {
        title: 'Series A fundraising strategy',
        description:
          'Need help preparing for Series A round - pitch deck, valuation, investor outreach.',
        category: RequestCategory.FINANCE,
        priority: Priority.HIGH,
        status: 'IN_PROGRESS',
        businessArea: 'SaaS',
        serviceType: 'Fundraising',
        clerkOrgId: COMPANY_A_ORG_ID,
        userId: techCorpUsers[0].id, // Alex
        dueDate: new Date('2024-04-20T14:00:00Z'),
      },
    }),
    prisma.request.create({
      data: {
        title: 'Product roadmap review',
        description:
          'Looking for feedback on our Q2 product roadmap and feature prioritization.',
        category: RequestCategory.PRODUCT,
        priority: Priority.MEDIUM,
        status: 'REVIEWING',
        businessArea: 'SaaS',
        serviceType: 'Product Strategy',
        clerkOrgId: COMPANY_A_ORG_ID,
        userId: techCorpUsers[1].id, // David
        dueDate: new Date('2024-04-10T09:00:00Z'),
      },
    }),
  ])

  // Create requests for Company B (FinTech)
  console.log('Creating FinTech requests...')
  const finTechRequests = await Promise.all([
    prisma.request.create({
      data: {
        title: 'B2B customer acquisition strategy',
        description:
          'Need help developing customer acquisition strategy for enterprise clients.',
        category: RequestCategory.SALES,
        priority: Priority.HIGH,
        status: 'SUBMITTED',
        businessArea: 'FinTech',
        serviceType: 'Sales Strategy',
        clerkOrgId: COMPANY_B_ORG_ID,
        userId: finTechUsers[0].id, // Emma
        dueDate: new Date('2024-04-12T11:00:00Z'),
      },
    }),
    prisma.request.create({
      data: {
        title: 'Compliance and regulatory guidance',
        description:
          'Need guidance on financial regulations and compliance requirements for our new features.',
        category: RequestCategory.LEGAL,
        priority: Priority.HIGH,
        status: 'IN_PROGRESS',
        businessArea: 'FinTech',
        serviceType: 'Legal Compliance',
        clerkOrgId: COMPANY_B_ORG_ID,
        userId: finTechUsers[0].id, // Emma
        dueDate: new Date('2024-04-18T16:00:00Z'),
      },
    }),
    prisma.request.create({
      data: {
        title: 'Marketing campaign optimization',
        description:
          'Looking to optimize our digital marketing campaigns and improve conversion rates.',
        category: RequestCategory.MARKETING,
        priority: Priority.MEDIUM,
        status: 'COMPLETED',
        businessArea: 'FinTech',
        serviceType: 'Digital Marketing',
        clerkOrgId: COMPANY_B_ORG_ID,
        userId: finTechUsers[1].id, // Lisa
        dueDate: new Date('2024-03-25T13:00:00Z'),
        completedAt: new Date('2024-03-30T15:30:00Z'),
      },
    }),
  ])

  console.log(
    'Company requests created:',
    techCorpRequests.length + finTechRequests.length
  )

  // Create notification preferences for all users
  console.log('Setting up notification preferences...')
  const allUsers = [...htvAdmins, ...techCorpUsers, ...finTechUsers]
  const notificationPreferences = await Promise.all(
    allUsers.map((user) =>
      prisma.notificationPreference.upsert({
        where: {
          userId_clerkOrgId: {
            userId: user.id,
            clerkOrgId: user.clerkOrgId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          clerkOrgId: user.clerkOrgId,
          inApp: true,
          email: true,
          enabled: true,
        },
      })
    )
  )
  console.log(
    'Notification preferences created:',
    notificationPreferences.length
  )

  console.log('Multi-tenant database seed completed successfully!')
  console.log('')
  console.log('DEV TEST SUMMARY:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('COMPANY A (TechCorp):')
  console.log(`   - Org ID: ${COMPANY_A_ORG_ID}`)
  console.log(`   - Admin: Alex Rodriguez (alex@techcorp.com)`)
  console.log(`   - User: David Kim (david@techcorp.com)`)
  console.log(`   - Requests: ${techCorpRequests.length}`)
  console.log('')
  console.log('COMPANY B (FinTech):')
  console.log(`   - Org ID: ${COMPANY_B_ORG_ID}`)
  console.log(`   - Admin: Emma Thompson (emma@fintech.com)`)
  console.log(`   - User: Lisa Wang (lisa@fintech.com)`)
  console.log(`   - Requests: ${finTechRequests.length}`)
  console.log('')
  console.log('HTV SUPER ADMIN:')
  console.log(`   - Org ID: ${HTV_ADMIN_ORG_ID}`)
  console.log(`   - Admin: Sarah Williams (admin@highticketventures.com)`)
  console.log(`   - Can see ALL companies and requests`)

  console.log('E2E TEST ORGANIZATION (org_test_e2e):')
  console.log(`   - Org ID: ${E2E_TEST_ORG_ID}`)
  console.log(`   - User: Test User (${process.env.E2E_USER_EMAIL})`)
  console.log(`   - Admin: Test Admin (${process.env.E2E_ADMIN_EMAIL})`)
  console.log('')
  console.log('TEST SCENARIOS:')
  console.log('   1. Login as Alex/David → See only TechCorp requests')
  console.log('   2. Login as Emma/Lisa → See only FinTech requests')
  console.log('   3. Login as Sarah → See ALL requests (cross-tenant)')
  console.log('   4. Admin can impersonate users from both companies')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error('Error during multi-tenant seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
