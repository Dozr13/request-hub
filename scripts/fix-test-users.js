import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixTestUsers() {
  try {
    console.log('Fixing test users clerkId values...')

    // Update test users with correct clerkId values
    // These should match what Clerk provides during authentication
    const updates = [
      {
        email: 'test.user@company1.com',
        clerkId: 'user_test_user_company1_com', // This should match what Clerk provides
      },
      {
        email: 'test.admin@company1.com',
        clerkId: 'user_test_admin_company1_com', // This should match what Clerk provides
      },
    ]

    for (const update of updates) {
      const user = await prisma.user.findUnique({
        where: { email: update.email },
      })

      if (user) {
        console.log(
          `Updating ${update.email} clerkId from ${user.clerkId} to ${update.clerkId}`
        )

        await prisma.user.update({
          where: { email: update.email },
          data: { clerkId: update.clerkId },
        })

        console.log(` Updated ${update.email}`)
      } else {
        console.log(`  User not found: ${update.email}`)
      }
    }

    console.log('Test users updated successfully!')
  } catch (error) {
    console.error('Error updating test users:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
fixTestUsers()
