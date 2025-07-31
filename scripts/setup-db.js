import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

async function main() {
  console.log('Setting up database...')

  try {
    // Push the schema to the database
    console.log('Pushing schema to database...')
    execSync('npx prisma db push', { stdio: 'inherit' })

    console.log(' Database setup completed!')
  } catch (error) {
    console.error('  Error setting up database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
